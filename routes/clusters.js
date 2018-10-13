const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Cluster = require('../models/cluster');

router.get('/', (req, res) => {
  Cluster.find({})
    .then(data => {
      res.send(data)
    })
})

router.get('/:date/:cluster', (req, res) => {
  console.log(req.params)
})
