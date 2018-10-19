const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Route = require('../../models/route');
const moment = require('moment');

router.get('/', (req, res, next) => {
  Route.find({})
    .then(data => {
      res.send(data)
    })
    .catch( err => {
      res.send(err)
    })
})

router.get('/:today', (req, res, next) => {
  const today = req.params.today
  const routes = Route.find({ createdDate: today})
  routes.exec( (err, doc) => {
    if(err){ res.status(500).send(err)};
    res.send(doc)
  })
})

router.get('/:today/:cluster', (req, res, next) => {
  const today = req.params.today;
  const cluster = req.params.cluster;

  const routes = Route.find({ createdDate: today, cluster: cluster })
  routes.exec( (err, doc) => {
    if(err){ res.status(500).send(err)}

    res.send(doc)
  })
})

router.get('/:today/:cluster/:route', (req, res, next) => {
  const today = req.params.today;
  const cluster = req.params.cluster;
  const route = req.params.route;

  const r = Route.find( { createdDate: today, cluster: cluster, name: route})
  routes.exec( (err, doc) => {
    if(err){ res.status(500).send(err)}

    res.send(doc)
  })
})

router.post('/', (req, res, next) => {
  const today = moment().format("MM-DD-YYYY")
  const date = req.body.date;
  const cluster = req.body.cluster;
  const routes = req.body.data;

  for(let key in routes){
    const route = Route.find({ createdDate: today, name: key }).limit(1)
    route.exec( (err, doc) => {
      if(doc.length) {
        console.log( doc.name + " already existed in database")
      } else {
        const tbasArr = routes[key]['tbas']
        const postalObj = routes[key]['postals']
        const newRoute = new Route({
          _id: new mongoose.Types.ObjectId(),
          type: routes[key]['type'],
          name: key,
          cluster: cluster,
          totalPackage: routes[key]['total'],
          atStation: routes[key]['atStation'],
          betweenStation: routes[key]['betweenStation'],
          outForDelivery: routes[key]['others'],
          createdDate: today,
          tbas: tbasArr,
          postals: postalObj
        })
        newRoute.save(err => {
          if(err) console.log(err)
        })
      }
    })
  }
})

router.delete('/reset', (req, res, next) => {
  Route.deleteMany({}).exec()
    .then( data => {
      res.send("You deleted everything.... :( ")
    })
})

module.exports = router;
