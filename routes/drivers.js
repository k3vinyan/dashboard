const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const moment = require('momment');

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
    console.log(driverArr[i])
  }

})


module.exports = router;
