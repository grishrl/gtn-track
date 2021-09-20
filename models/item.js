const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  "itemid": String,
  "name": String,
  "category": String,
  "vendorInf":{
    "vendor":Boolean,
    "vendorBuy":Number,
    "vendorSell":Number,
  },
  "jawaInf":{
    "jawa":Boolean,
    "jawaJunkLevel": String,
    "jawaJunkPrice": Number
  },
  "lastTouched":Number
})

const Item = mongoose.model('item', itemSchema);

module.exports = Item;
