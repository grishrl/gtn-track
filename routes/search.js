const router = require('express').Router();
const Item = require('../models/item');

router.get('/item', (req, res)=>{
  let str = req.query.item;
  let regEx = new RegExp(str, "i");
  Item.find({name:regEx}).exec().then(
    (found)=>{
      res.status(200).send({status:200, retObj:found})
      return found;
    },
    (err)=>{
      res.status(500).send({
        status: 500,
        retObj: err
      });
    }
  )
})

module.exports = router;
