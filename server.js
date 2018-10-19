const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
require('dotenv').config();
const Block = require('./models/block');
const Driver = require('./models/driver');
const moment = require('moment');

const rosterRoutes = require('./routes/api/rosters');
const blockRoutes = require('./routes/api/blocks');
const clusterRoutes = require('./routes/api/clusters');
const driverRoutes = require('./routes/api/drivers');
const routeRoutes = require('./routes/api/routes');
const tbaRoutes = require('./routes/api/tbas');

const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true, parameterLimit: 1000000}))

const port = process.env.PORT || 3000;

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

  socket.on('check', (data)=> {
    const _id = data._id;
    const check = data.checkin;

    Driver.findById(_id, function(err, doc){
      doc.set({checkin: check})
      doc.save(function(err, doc){
        if(err) console.log(err);
        console.log('saved!')

        socket.broadcast.emit('checkupdated', doc)
      })
    })
    // Driver.findOneAndUpdate(query, {$set: {checkin: check}}, {new: true, upsert: true}, function(err, result){
    //   console.log(result)
    // })
  })
})

app.use('/api/rosters', rosterRoutes);
app.use('/api/blocks', blockRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/tbas', tbaRoutes);

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname,'/dist/index.html'));
});

http.listen(port, function(){
  console.log('listening on port: ' + port)
})
