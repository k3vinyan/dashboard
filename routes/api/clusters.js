// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
//
// const Cluster = require('../../models/cluster');
//
// router.use(bodyParser.json({limit: '10mb', extended: true}))
// router.use(bodyParser.urlencoded({limit: '10mb', extended: true, parameterLimit: 1000000}))
//
// router.get('/', (req, res) => {
//   Cluster.find({})
//     .then(data => {
//       res.send(data)
//     })
// })
//
//
// router.get('/:date/:cluster', (req, res) => {
//   const d = req.params.date;
//   const c = req.params.cluster;
//
//   console.log(d)
//   console.log(c)
//
//   Cluster.find({date: d, cluster: c})
//     .then(data => {
//       res.send(data)
//     })
// })
//
// router.get('/reset', (req, res) => {
//   Cluster.deleteMany().exec()
//     .then( data => {
//       res.send("You deleted everything.... :( " + data)
//     })
// })
//
// module.exports = router;
