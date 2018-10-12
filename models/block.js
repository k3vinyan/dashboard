const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blockSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  block: String,
  shiftLength: String,
  accepted: Number,
  actual: Number,
  noShow: Number,
  date: String,
})

module.exports = mongoose.model('Block', blockSchema);
