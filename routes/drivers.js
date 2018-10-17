const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const moment = require('moment');

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

  //const rId = Roster.findOne({ date: today })._id

  //need to check for dup
  for(let i = 0; i < driverArr.length; i++){
    try{
      let d = new Driver({
        _id: new mongoose.Types.ObjectId(),
        name: driverArr[i]['driver'],
        driverId: driverArr[i]['id'],
        shiftLength: driverArr[i]['shiftLength'],
        startTime: driverArr[i]['startTme'],
        endTime: driverArr[i]['endTime'],
        createdDate: today,
        checkin: false
        //block: rId
      })
      d.save(err => {
        if(err) console.log(err)
        console.log('saved!')
      })
    } catch (e) {
      console.log(e)
      break;
    }
  }
  res.send('drivers saved sucessfully!')
})

router.delete('/', (req, res, next) => {
  Driver.deleteMany().exec()
  .then( () => {
    console.log('deleted!!!')
    res.send("You deleted everything.... :( " + data)
  })
})

router.delete('/:today', (req, res, next) => {
  const today = req.params.today;

  Driver.deleteMany({date: createdDate}).exec()
    .then( data => {
      res.send("You deleted everything.... :( " + data)
    })
})
module.exports = router;
