const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  driverId: String,
  name: String,
  shiftLength: String,
  startTime: String,
  endTime: String,
  checkin: Boolean,
  block: { type: Schema.Types.ObjectId, ref: 'Block' }
})

module.exports = mongoose.model('Driver', driverSchema);
