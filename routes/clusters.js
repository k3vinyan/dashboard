const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Cluster = require('../models/cluster');

router.use(bodyParser.urlencoded({ extended: false }))

router.get('/', (req, res) => {
  Cluster.find({})
    .then(data => {
      res.send(data)
    })
})

router.post('/', (req, res) => {

  const date = req.body.date;
  const cluster = req.body.cluster;
  const data = req.body.data;

  console.log(Cluster.find({date: date, cluster: cluster}))
})

router.get('/:date/:cluster', (req, res) => {
  const d = req.params.date;
  const c = req.params.cluster;

  Cluster.find({date: d, cluster: c})
    .then(data => {
      res.send(data)
    })
})

module.exports = router;
