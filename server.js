const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const path = require('path');
const express = require("express");

const writeRoutes = require('./routes/write');

const readRoutes = require('./routes/read');

const searchRoutes = require('./routes/search');

//host name and port
const hostname = process.env.hostname;
const port = process.env.port;

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
