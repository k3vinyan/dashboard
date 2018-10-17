const express = require('express');
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
  const today = req.params.today
  const data = JSON.parse(req.body.data);
  console.log(data)
  console.log(data.length)
  for(let i = 0; i < data.length; i++){
    console.log(data[i])
  }

  for(let i in data){
    console.log(i);
    console.log(data[i])
    console.log('-----------------------')
  }
  console.log('this is the roster')

  Roster.findOne({ date: today})
  .exec(function(err, result){
    if(result === null){
      console.log('document doesn\'t exist')

      let blocks = [];

    } else if(err){
      console.log('error has occurred: ' + error)
      res.send(error)
    }
  })



  res.send(req.params.today)




})

module.exports = router;
