const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Block = require('../models/block');
const BlockHtml = require('../models/blockhtml');

router.get('/', (req, res, next) => {
  Block.find({})
    .then(data => {
      res.send(data)
    })
})

router.get('/html', (req, res, next) => {
  BlockHtml.findOne()
    .then( data => {
      console.log(data)
      res.send(data['html'])
    })
})


module.exports = router;
