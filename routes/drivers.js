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

//for testing
router.get('/count', (req, res, next) => {
  Driver.countDocuments({})
  .exec( (err, count )=> {
    if(err){
      res.status(500).send(err)
    } else {
      console.log( "Number of users:", count );
      res.send({count: count})
    }
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

    try{
      const driver = Driver.find({driverId: driverId, block: block, createdDate: today}).limit(1)
      const promise = driver.exec( (err, doc) => {
        if(doc.length) {
          console.log( doc.name + " already existed in database")
        } else {
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
          })
        }
        return;
      })

      promise.then.then((doc) =>{
        Driver.find({createdDate: today})
        .exec( (err, docs) => {
          res.send(docs)
        })
      })
      .catch( ()=> {
        console.log('dhsdfsjl;ksjd;fsd;')
      })
    } catch (e) {
      console.log(e)
      break;
    }
  }
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
