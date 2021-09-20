const router = require('express').Router();
const readFn = require('../methods/read');
const aws = require('../methods/aws');

// router.post('/item/single',(req, res)=>{

//   let request = req.body;

//   readFn.readOne(request.type, request.id).then(
//     ret=>{
//       res.status(200).send(ret);
//     },
//     err=>{
//       res.status(500).send(err);
//     }
//   );

// });

// router.post('/item/all', (req, res) => {

//   let request = req.body;

//   readFn.readAll(request.type).then(
//     ret => {
//       res.status(200).send(ret);
//     },
//     err => {
//       res.status(500).send(err);
//     }
//   );

// });


// router.post('/item/pricehistory', (req, res)=>{
//     let request = req.body;

//     readFn.itemPriceHistor(request.id).then(
//       ret => {
//         res.status(200).send(ret);
//       },
//       err => {
//         res.status(500).send(err);
//       }
//     );
// });

router.get('/item', (req, res)=>{
  console.log('read')
  let q = req.query.item;
  if(q.length>0){
    aws.s3getObject(q).then(
      r=>{
        var ret = {};
        if(r){
          if(r.Body){
            let t = r.Body.toString('utf-8');
            ret = JSON.parse(t);
          }
        }
        res.status(200).send(ret);
      },
      e=>{
        res.status(500).send(e);
      }
    )
  }else{
    res.status(500).send('emtpy request');
  }
});

router.get('/list', (req, res)=>{
  
  console.log('list')

  aws.s3listObject().then(
    r=>{
      res.status(200).send(r);
    },
    e=>{
      res.status(500).send(e);
    }
  )
  
});


module.exports = router;
