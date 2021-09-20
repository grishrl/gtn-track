const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schematicSchema = new Schema({
  "itemid":String,
  "name":String,
  "craftingSkill":String,
  "materials":Object
},{
  useNestedStrict: false
})

const Scheamtic = mongoose.model('schematic', schematicSchema);

module.exports = Scheamtic;
