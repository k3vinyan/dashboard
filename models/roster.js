const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rosterSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: String,
  blockCount: Number,
  blocks: [{ type: Schema.Types.ObjectId, ref: 'Block' }]
});

module.exports = mongoose.model('Roster', rosterSchema);
