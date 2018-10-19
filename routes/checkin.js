const mongoose = require('mongoose');
const router = mongoose.Router();
const moment = require('moment');

router.get('/', (req, res, next) => {
  const today = moment().format("MM-DD-YYYY")
  Driver.find({ createdDate: today}, () => {

  })

})
