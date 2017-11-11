require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
var sampleData = require('./ebayHelpers');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json({strict: false}));

app.get('/', () => res.render('index'));

app.get('/auctions', (req, res) => {
  items.selectAll((err, data) => {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/auctions', (req, res) => {
  console.log('POST received to /auctions with body: \n', req.body);
  res.status(201).send();
})

// You must specify your AppID in the X-EBAY-SOA-SECURITY-APPNAME HTTP header 
// (or SECURITY-APPNAME URL parameter) of every request.

app.listen(process.env.PORT, function() {
  console.log(`listening on port ${process.env.PORT}!`); 
});

