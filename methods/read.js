const Item = require('../models/item');
const Category = require('../models/category');
const ItemPrice = require('../models/itemPrice');
const Schematic = require('../models/schematic');
const uniqid = require('uniqid');

async function readOne(type, id){
   let retObj = {
     status: true,
     retObj: null,
   }
   if (type === 'item') {
     await Item.findOne({
       itemid: id
     }).then(
       found => {
         retObj.retObj = found;
       },
       err => {
         retObj.status = false;
       }
     )
   } else if (type === 'category') {
     await Category.findOne({
       itemid: id
     }).then(
       found => {
         retObj.retObj = found;
       },
       err => {
         retObj.status = false;
       }
     );
   } else if (type === 'itemprice') {
     await ItemPrice.findOne({
       itemid: id
     }).then(
       found => {
         retObj.retObj = found;
       },
       err => {
         retObj.status = false;
       }
     );
   } else if (type === 'schematic') {
     await Schematic.findOne({
       itemid: id
     }).then(
       found => {
         retObj.retObj = found;
       },
       err => {
         retObj.status = false;
       }
     );
   } else {
     retObj.status = false;
   }

   return retObj;
}

async function readAll(type){
  let retObj = {
    status: true,
    retObj: null,
  }
  if (type === 'item') {
    await Item.find().then(
      found => {
        retObj.retObj = found;
      },
      err => {
        retObj.status = false;
      }
    )
  } else if (type === 'category') {
    await Category.find().then(
      found => {
        retObj.retObj = found;
      },
      err => {
        retObj.status = false;
      }
    );
  } else if (type === 'itemprice') {
    retObj.status = false;
  } else if (type === 'schematic') {
    await Schematic.find().then(
      found => {
        retObj.retObj = found;
      },
      err => {
        retObj.status = false;
      }
    );
  } else {
    retObj.status = false;
  }

  return retObj;
}

async function itemPriceHistory(itemid){
    let retObj = {
      status: true,
      retObj: null,
    }
  await ItemPrice.find({itemid:itemid}).sort(['date',-1]).then(
    found=>{
     retObj.retObj = found;
    },
    err=>{
      retObj.status = false;
    }
  )
  return retObj;
}


module.exports = {
  readOne, readAll, itemPriceHistory
}
