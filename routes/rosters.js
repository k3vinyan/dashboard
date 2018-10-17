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
  console.log('this is the roster')

  Roster.findOne({ date: today})
  .exec(function(err, result){
    if(result === null){
      console.log('document doesnt exist')
    } else if(err){
      console.log('error has occurred: ' + error)
    }
  })
  .then(function(result){
    console.log('document does exist')
    res.send('result: '  + result )
  })
  .catch(error => {
    console.log('this is a error:' + error)
  })



  res.send(req.params.today)




})

module.exports = router;
