const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
require('dotenv').config();
const Block = require('./models/block');
const Driver = require('./models/driver');
//const BlockHtml = require('./models/blockhtml');
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
    const driverId = data['driverId'];
    const startTime = data['startTime'];
    const endTime = data['endTime'];
    const check = data['checkin'];
    const today = moment().format("MM-DD-YYYY");
    const query = {driverId: driverId, startTime: startTime, endTime: endTime, createdDate: today};
    console.log(data)
    console.log(query)
    Driver.findOneAndUpdate(query, {checkin: check}, (err, result) => {
        if(err) return err;
        console.log(result)
        console.log("Saved successful!")
    })

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
