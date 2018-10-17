const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Roster = require('../models/roster');
const Driver = require('../models/driver');

router.get('/', (req, res, next) => {
  Roster.find({})
    .then( data => {
      res.send(data)
    })
    .catch( error => {
      res.status(500).send({err: error})
    })
})

router.get('/:today', (req, res, next) => {
  const today = req.params.today;
  const r = Roster.find({ date: today})
  .then(function(result){
    res.send(result)
  })
  .catch(function(error){
    res.status(500).send({err: error})
  })
})
router.post('/:today', (req, res, next) => {
  const today = req.params.today;
  const driverArr = JSON.parse(req.body.data)

  const r = Roster.findOne({ date: today})
  r.exec(function(err, result){
    if(result === null){
      console.log('document doesn\'t exist')
      const roster = new Roster({
        _id: new mongoose.Types.ObjectId(),
        date: today,
        blockCount: 0,
      })
      .save()
      .then(function(result){
        let driver = new Driver({
          _id: new mongoose.Types.ObjectId(),
          name: driverArr[i]['driver'],
          driverId: driverArr[i]['id'],
          shiftLength: driverArr[i]['shiftLength'],
          startTime: driverArr[i]['startTme'],
          endTime: driverArr[i]['endTime'],
          checkin: false,
          block: result._id
        })
        .save()
      })
      .catch(function(error){
        console.log('error')
        console.log(error)
      })
    } else if(err){
      console.log('error has occurred: ' + error)
      res.send(error)
    } else if(result.blockCount != driverArr){
      for(let i = 0; i < driverArr.length; i++){
        let dID = driverArr[i]['id'];
        let dShiftLength = driverArr[i]['shiftLength'];
        if(Driver.findOne({driverId: dID, ShiftLength: dShiftLength}) === null){
          console.log("Driver already existed!")
        } else {
          let driver = new Driver({
            _id: new mongoose.Types.ObjectId(),
            name: driverArr[i]['driver'],
            driverId: driverArr[i]['id'],
            shiftLength: driverArr[i]['shiftLength'],
            startTime: driverArr[i]['startTme'],
            endTime: driverArr[i]['endTime'],
            checkin: false,
            block: result._id
          })
          .save()
        }
        res.send(result)
      }
    }
  })
  r
})

router.get('/delete/:today', (req, res, next) => {
  const today = req.params.today;
  Roster.findOneAndRemove({date: today}, function(err, result){
    console.log('Roster was deleted!')
  }).exec()
})

module.exports = router;
