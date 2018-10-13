const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clusterSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: String,
  cluster: String,
  data: String
})

module.exports = mongoose.model('Cluster', clusterSchema);
