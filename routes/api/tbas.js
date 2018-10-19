const express = require('express');
const router = express.Router();
const Tba = require('../../models/tba');

router.get('/', (req, res, next) => {
  Tba.find({})
  .then( data => {
    res.send(data)
  })

});

router.post('/', (req, res, next) => {
  console.log('this is the tba post route')
  console.log(req.body)
  const tba = req.body.tba;
  const shipOptions = req.body.shipOptions;
  const arrivalDate = req.body.arrivalDate;
  const city = req.body.city;
  const postal = req.body.postal;
  const status = req.body.status;
  const associate = req.body.associate;

  const t = new Tba({
    tba: tba,
    shipOptions: shipOptions,
    arrivalDate: arrivalDate,
    city: city,
    postal: postal,
    status: status,
    associate: associate
  })
  tba.save()
  .then( data => {
    res.send('Tba was saved!: ' + data)
  })
  .catch( error => {
    res.status(500).send('error: ' + error)
  })
})

module.exports = router;
