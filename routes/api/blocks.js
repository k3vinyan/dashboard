const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Block = require('../../models/block');

router.get('/', (req, res, next) => {
  Block.find({})
  .then(data => {
    res.send(data)
  })
})

router.post('/:today', (req, res, next) => {
  console.log(req.body)
  const today = req.body.today;
  console.log(today);

  Block.find({date: today, })

  res.send(today + "hello");
})

router.get('/html', (req, res, next) => {
  BlockHtml.findOne()
  .then( data => {
    console.log(data)
    res.send(data['html'])
  })

})


module.exports = router;
