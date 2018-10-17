const mongoose = requre('mongoose');
const Schema = mongoose.Schema;

const driverSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  driverId: String,
  checkin: Boolean
})

module.exports = mongoose.model('Driver', driverSchema);
