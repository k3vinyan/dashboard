const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Roster = require('../models/roster');

router.get('/', (req, res, next) => {
  Roster.find({})
    .then( data => {
      res.send(data)
    })
    .catch( error => {
      res.status(500).send('error: ' + error)
    })
})

router.post('/:today', (req, res, next) => {
  const today = req.params.today;
  const dataArr = JSON.parse(req.body.data)

  for(let i = 0; i < dataArr.length; i++){
    console.log(dataArr[i])
  }

  console.log('this is the roster')

  r Roster.findOne({ date: today})
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
        console.log('result')
        console.log(result)
      })
      .catch(function(error){
        console.log('error')
        console.log(error)
      })

      let blocks = [];

    } else if(err){
      console.log('error has occurred: ' + error)
      res.send(error)
    } else {
      console.log('----------------------------')
      console.log(r.blockCount)
    }
  })
  res.send(req.params.today)
})

router.get('/delete/:today', (req, res, next) => {
  const today = req.params.today;
  Roster.findOneAndRemove({date: today}, function(err, result){
    console.log('Roster was deleted!')
  }).exec()
})

module.exports = router;
