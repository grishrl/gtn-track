const Item = require('../models/item');
const Category = require('../models/category');
const ItemPrice = require('../models/itemPrice');
const Schematic = require('../models/schematic');
const uniqid = require('uniqid');

async function createUpdate(type, obj){

  let retObj = {
    status:true,
    retObj:null,
  }

  if(type === 'itemprice'){
    if (!obj.indexid) {
      obj.indexid = uniqid();
    }
    if(!obj.date){
      obj.date = Date.now();
    }
  }else{
    if (!obj.itemid) {
      obj.itemid = uniqid();
    }
  }

  console.log(type, obj);
  

  if(type==='item'){
    console.log('here..');
    let x = await Item.findOneAndUpdate({itemid:obj.itemid},obj,{new:true, upsert:true}).then(
      save=>{
        console.log('saved', save);
        retObj.retObj = save;
      },
      err=>{
        console.log('err', err);
        retObj.status = false;
      }
    );
    console.log('here 2', x)
  }else if(type === 'category'){
    await Category.findOneAndUpdate({
        name: obj.name
      }, obj, {
        new: true,
        upsert: true
      }).then(
      save => {
        retObj.retObj = save;
      },
      err => {
        retObj.status = false;
      }
    )

  }else if(type === 'itemprice'){
   await new ItemPrice(obj).then(
      save => {
        retObj.retObj = save;
      },
      err => {
        retObj.status = false;
      }
    );
  }else if(type === 'schematic'){
    await Schematic.findOneAndUpdate({
          name: obj.name
        },
        obj, {
          new: true,
          upsert: true
        }).then(
      save => {
        retObj.retObj = save;
      },
      err => {
        retObj.status = false;
      }
    )
  }else{
    retObj.status = false;
  }

  console.log('returning..');
  return retObj;
}

async function del(type, obj){

let retObj = {
  status: true,
  retObj: null,
}

if (type === 'item') {
  retObj.retObj = await Item.deleteOne({itemid:obj.itemid});
} else if (type === 'category') {
  retObj.retObj = await Category.deleteOne({itemid:obj.itemid});
} else if (type === 'itemprice') {
  retObj.retObj = await Category.deleteOne({indexid: obj.indexid});
} else if (type === 'schematic') {
  retObj.retObj = await Schematic.deleteOne({itemid: obj.itemid});
} else {
  retObj.status = false;
}

return retObj;

}

module.exports = {
  createUpdate,del
}
