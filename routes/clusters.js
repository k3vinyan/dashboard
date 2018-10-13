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

router.post('/', (req, res) => {

  const date = req.body.date;
  const cluster = req.body.cluster;
  const data = req.body.data;
  Cluster.find({date: date, cluster: cluster}, function(err, docs){
    console.log(docs.length)
    console.log(date)
    console.log(cluster)
    console.log('----------------------------------')
    console.log(docs)

    if(docs.length === 0){
      console.log("hiiiii")
      let cluster = new Cluster({
        _id: new mongoose.Types.ObjectId(),
        date: date,
        cluster: cluster,
        data: data
      })
      cluster.save()
        .then( data => {
          res.send('data saved!')
        })
        .catch( err => {
          res.sendStatus(500).json({
            error: err
          })
        })
    } else {
      res.send('data already exist')
    }
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
