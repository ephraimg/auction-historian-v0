require('dotenv').config();
var Promise = require('bluebird');
var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo/index');
var ebay = require('./ebayHelpers');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json({strict: false}));

app.get('/', () => res.render('index'));

app.get('/auctions', (req, res) => {
  Promise.all([
    db.Auction.find({})
      .lean(true)
      .limit(10)
      .exec(),
    db.Auction.find({})
      .select('itemId')
      .lean(true)
      .exec()
  ])
  .then(results => {
    console.log('================>\n', results, '\n<===============');
    res.status(200).send(results);
  })
  .catch(err => {
    res.sendStatus(500);
  });
});

app.post('/auctions', (req, res) => {
  db.saveAuction(req.body);
  res.status(201).send();
});

app.post('/search', (req, res) => {
  // ebay.search(req.body, results => res.send(results));
  res.send('hello');
});

// You must specify your AppID in the X-EBAY-SOA-SECURITY-APPNAME HTTP header 
// (or SECURITY-APPNAME URL parameter) of every request.

app.listen(process.env.PORT, function() {
  console.log(`listening on port ${process.env.PORT}!`); 
});

