const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const path = require('path');
const express = require("express");

const writeRoutes = require('./routes/write');

const readRoutes = require('./routes/read');

const searchRoutes = require('./routes/search');

//host name and port
const hostname = process.env.hostname;
const port = process.env.PORT;

//bootstrap express server
const app = express();

    //configs...
    app.use(bodyParser.json({
      limit: '2.5mb',
      extended: true
    }));

    app.use(bodyParser.urlencoded({
      extended: false
    }));

    app.use((req,res, next)=>{
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
        next();
    }
    )


    app.use('/read', readRoutes);
    app.use('/write', writeRoutes);
    app.use('/search', searchRoutes)

//create server listening on port
let server = app.listen(port, hostname, () => {
  console.log(`Server ${hostname} running at on ${port}`);
});


// connect to mongo db
// mongoose.connect(process.env.mongoURI, () => {
//   console.log('connected to mongodb');
// });

// app.use('/', express.static(path.join(__dirname, './client/gtnTrack/dist/gtnTrack')));

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, './client/gtnTrack/dist/gtnTrack/index.html'));
// });
