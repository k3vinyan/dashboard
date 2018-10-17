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
  console.log(req.params.today)
  console.log('this is the roster')
  console.log(Roster.find({date: req.params.today}))
  res.send(req.params.today)


})

module.exports = router;
