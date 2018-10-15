const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clusterSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: String,
  cluster: String,
  data: [routeSchema]
})

const routeSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: String,
  atStation: Number,
  betweenStation: Number,
  outForDelivery: Number,
  others: Number,
  tbas: [tbaSchema]
})

const tbaSchema = new Schema({
  tba: String,
  postal: String,
  status: String,
  type: String,

})

module.exports = mongoose.model('Cluster', clusterSchema);
