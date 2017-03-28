/*imports*/
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(morgan('dev'));
app.use(cors());

/*setting up the database connection*/
mongoose.connect("mongodb://127.0.0.1:27017/azone", (err) => {
  if(err){
    console.log("Error in connecting to the database"+ err);
  }
  else{
    console.log("Successfully connected to the database");
}
});

/*define api routes path*/
const api = require('./server/routes/api');


//Parsers for post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

//setup api routes
app.use('/api',api);


//catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

//create http server
const server = http.createServer(app);

//server listening
server.listen(port, ()=>console.log(`API running on localhost:${port}`));
