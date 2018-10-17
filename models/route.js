const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: String,
  atStation: Number,
  betweenStation: Number,
  outForDelivery: Number,
  others: Number,
  tbas: [{ type: Schema.Types.ObjectId, ref: 'Tba' }],
  cluster: { type: Schema.Types.ObjectId, ref: 'Cluster' }
})

model.exports = mongoose.model('Route', routeSchema);
