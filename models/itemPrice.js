const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemPriceSchema = new Schema({
  "indexid":String,
  "itemid": String,
  "categoryid": String,
  "price": Number,
  "date": Number
})

const ItemPrice = mongoose.model('itemPrice', itemPriceSchema);

module.exports = ItemPrice
