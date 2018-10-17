const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blockSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: String,
  block: String,
  shiftLength: String,
  accepted: Number,
  actual: Number,
  noShow: Number,
  roster: { type: Schema.Types.ObjectId, ref: 'Roster'},
  drivers: [{ type: Schema.Types.ObjectId, ref: 'Driver' }],
})

module.exports = mongoose.model('Block', blockSchema);
