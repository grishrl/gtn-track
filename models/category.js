const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  "itemid": String,
  "name":String,
})

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
