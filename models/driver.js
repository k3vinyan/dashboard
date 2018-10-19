const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  driverId: String,
  name: String,
  block: String,
  shiftLength: String,
  startTime: String,
  endTime: String,
  checkin: Boolean,
  createdDate: String
})

module.exports = mongoose.model('Driver', driverSchema);
