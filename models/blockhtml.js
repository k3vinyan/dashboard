const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const blockHtmlSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  entry: Number,
  html: String
})

module.exports = mongoose.model('BlockHtml', blockHtmlSchema);
