const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const moment = require('mosment');

const Driver = require('../models/driver');
const Roster = require('../models/roster');

router.get('/', (req, res, next) => {
  const drivers = Driver.find({})
  drivers.then( result => {
    res.send(result)
  })
  .catch( err => {
    res.status(500).send({error: err})
  })
})

router.post('/', (req, res, next) => {
  const today = moment().format("MM-DD-YYYY");
  const driverArr = JSON.parse(req.body.data)

  const rId = Roster.findOne({ date: today })._id
  console.log(rId)

  for(let i = 0; i < driverArr.length; i++){
    let d = new Driver({
      _id: new mongoose.Types.ObjectId(),
      name: driverArr[i]['driver'],
      driverId: driverArr[i]['id'],
      shiftLength: driverArr[i]['shiftLength'],
      startTime: driverArr[i]['startTme'],
      endTime: driverArr[i]['endTime'],
      checkin: false,
      block: rId
    })
    d.save(function(err){
      if(err) console.log(err)

      console.log('saved!')
    })
  }

})


module.exports = router;
