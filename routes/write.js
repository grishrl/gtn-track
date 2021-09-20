const router = require('express').Router();
const writeFn = require('../methods/cud');
const aws = require('../methods/aws');

// router.post('/item', (req, res) => {

//   let request = req.body;
//   console.log('request', request);
//   writeFn.createUpdate(request.type, request.obj).then(
//     ret => {
//       res.status(200).send(ret);
//     },
//     err => {
//       console.log(err);
//       res.status(500).send(err);
//     }
//   );

// });

// router.post('/itemdel', (req, res) => {

//   let request = req.body;

//   writeFn.del(request.type, request.obj).then(
//     ret => {
//       res.status(200).send(ret);
//     },
//     err => {
//       res.status(500).send(err);
//     }
//   );

// });

router.post('/item', (req, res)=>{
  let o = req.body.info;
  let id = req.body.id;
  if(o && Object.keys(o).length>0 && typeof o == 'object'){
    aws.s3putObject(id, o).then(
      r=>{
        res.status(200).send(
          {success:true, id:r.id}
        );
      },
      e=>{
        res.status(500).send(e);
      }
    )
  }else{
    res.status(500).send('body must have info property must be object and must not be empty');
  }
});

module.exports = router;
