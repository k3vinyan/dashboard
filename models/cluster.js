const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clusterSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: String,
  cluster: String,
  routes: [{ type: Schema.Types.ObjectId, ref: 'Route' }],
  tbas: { type: Schema.Types.ObjectId, ref: 'Route' }
})

model.exports = mongoose.model('Route', routeSchema);
