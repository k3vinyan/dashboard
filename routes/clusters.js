const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Cluster = require('../models/cluster');

router.use(bodyParser.json({limit: '10mb', extended: true}))
router.use(bodyParser.urlencoded({limit: '10mb', extended: true, parameterLimit: 1000000}))

router.get('/', (req, res) => {
  Cluster.find({})
    .then(data => {
      res.send(data)
    })
})

router.post('/', (req, res, next) => {

  const date = req.body.date;
  const cluster = req.body.cluster;
  const data = req.body.data;
  console.log("data: " + data)
  const count = Cluster.find({date: date, cluster: cluster}, function(err, docs){
    return docs
  })
  .then( data => {
    if( data.length != 0){
      res.send('cluster already existed!')
    } else {
      const c = new Cluster({
        _id: new mongoose.Types.ObjectId(),
        date: date,
        cluster: cluster,
        data: data
      })
      c.save()
      .then( data => {
        res.send('cluster saved!')
      })
      .catch( err => {
        res.send('error: ' + err)
      })
    }
  })
  .catch( err => {
    res.send('error: ' + err)
  })
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
