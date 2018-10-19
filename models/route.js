const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: String,
  name: String,
  cluster: String,
  totalPackage: String,
  atStation: Number,
  betweenStation: Number,
  outForDelivery: Number,
  others: Number,
  createdDate: String,
  checkout: Boolean,
  tbas: [Schema.Types.Mixed],
  postals: [Schema.Types.Mixed]
})

module.exports = mongoose.model('Route', routeSchema);
