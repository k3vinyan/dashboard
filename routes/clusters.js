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
  const route = req.body.data;
  console.log("data: " + data)
  const count = Cluster.find({date: date, cluster: cluster}, function(err, docs){
    return docs
  })
  .then( data => {
    // if( data.length != 0){
    //   res.send('cluster already existed!')
    // } else {
      for(let i in route){
        console.log(i)
        console.log(data[i])
        console.log('-----------------------------------------')
      }
      const c = new Cluster({
        _id: new mongoose.Types.ObjectId(),
        date: date,
        cluster: cluster,
        data: route
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

  console.log(d)
  console.log(c)

  Cluster.find({date: d, cluster: c})
    .then(data => {
      res.send(data)
    })
})

router.get('/reset', (req, res) => {
  Cluster.deleteMany().exec()
    .then( data => {
      res.send("You deleted everything.... :( " + data)
    })
})

module.exports = router;
