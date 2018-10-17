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
    const name = driverArr[i]['name'];
    const driverId = driverArr[i]['id'];
    const block = driverArr[i]['block'];
    const shiftLength = driverArr[i]['shiftLength'];
    const startTime = driverArr[i]['startTime'];
    const endTime = driverArr[i]['endTime'];

    console.log(name)

    try{
      const checkDriver = Driver.find({driverId: driverId, block: block, createdDate: today})
      checkDriver.exec( result => {
        console.log(result)
        if( result === null ) {
          const d = new Driver({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            block: block,
            driverId: driverId,
            shiftLength: shiftLength,
            startTime: startTime,
            endTime: endTime,
            createdDate: today,
            checkin: false
            //block: rId
          })
          d.save(err => {
            if(err) console.log(err)
          //  console.log('saved!')
          })
        } else {
          console.log( result.name + " already existed in database")
        }
      })
    } catch (e) {
      console.log(e)
      break;
    }
  }
  res.send('All drivers saved sucessfully!')
})

router.delete('/deleteAll', (req, res, next) => {
  Driver.deleteMany().exec()
  .then( () => {
    console.log('deleted!!!')
    res.send("You deleted everything.... :( " )
  })
  .catch( error => {
    res.send({ err: error})
  })
})

router.delete('/:today', (req, res, next) => {
  const today = req.params.today;

  Driver.deleteMany({date: createdDate}).exec()
    .then( data => {
      res.send("You deleted everything.... :( " + data)
    })
    .catch( error => {
      res.send( {error: error })
    })
})
module.exports = router;
