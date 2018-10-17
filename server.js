const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
require('dotenv').config();
const Block = require('./models/block');
const Driver = require('./models/driver');
const BlockHtml = require('./models/blockhtml');
const moment = require('moment');

const rosterRoutes = require('./routes/rosters');
const blockRoutes = require('./routes/blocks');
const clusterRoutes = require('./routes/clusters');
const driverRoutes = require('./routes/drivers');
const bodyParser = require('body-parser');


const port = process.env.PORT;

mongoose.connect('mongodb://' + process.env.USERNAME + ':' + process.env.PW +
  '@ds231133.mlab.com:31133/socketserver',
{ useNewUrlParser: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection errors: '));
db.once('open', () => {
  console.log('connected to database')
});

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }))

io.on('connection', (socket) => {
  console.log('user connected')
  date = moment().format("MM-DD-YYYY");

  socket.on('check', (data)=>{
    const driverId = data['driverId'];
    const startTime = data['startTime'];
    const endTime = data['endTime'];
    const check = data['checkin'];

    Driver.find({driverId: driverId, startTime: startTime, endTime: endTime}).limit(1)
    .exec()
    .then( d => {
      d.checkin = check;
      d.save( e => {
        if(e) console.log('unable to saved: ' + e)
        console.log(d)
        socket.broadcast.emit('updateCheck', d)
      })
    })
    .catch( e => {
      console.log("Check error: " + e)
    })
  })


  socket.on('sameBlock', (data) => {
    const b = BlockHtml.findOne()
    b.updateOne({html: data})
      .then( data => {
        console.log("successful: " + data)
      })
      .catch(err => {
        console.log("error: " + err)
      })

  })
})

app.use('/rosters', rosterRoutes);
app.use('/blocks', blockRoutes);
app.use('/checkout', clusterRoutes);
app.use('/drivers', driverRoutes);

http.listen(port, function(){
  console.log('listening on port: ' + port)
})
