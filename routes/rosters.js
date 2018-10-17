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
  const today = req.params.today;
  const dataArr = JSON.parse(req.body.data)
  for(let i = 0; i < dataArr.length; i++){
    console.log(dataArr[i])
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
