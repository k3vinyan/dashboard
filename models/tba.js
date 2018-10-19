const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tbaSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tba: String,
  shipOptions: String,
  arrivalDate: String,
  city: String,
  postal: String,
  status: String,
  associate: String,
  createdDate: String,
  route: { type: Schema.Types.ObjectId, ref: 'Route' },
  cluster:  { type: Schema.Types.ObjectId, ref: 'Cluster' }
})



module.exports = mongoose.model('Tba', tbaSchema);
