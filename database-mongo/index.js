require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var auctionSchema = mongoose.Schema({
  itemId: {type: String, unique: true},
  title: String,
  categoryId: String,
  galleryURL: String,
  viewItemURL: String,
  currentPrice: Number,
  currencyId: String,
  endTime: Date 
});
var Auction = mongoose.model('Auction', auctionSchema);

/* Uncomment below to see errors, e.g. dup indexes */
// Auction.schema.options.emitIndexErrors;
// Auction.on('error', function(error) {
//   console.log('Mongoose index error... ', error);
// });

var selectAll = function(callback) {
  Auction.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

// sample save for testing
var saveAuction = ebayItem => {
  var currentPrice = Number(ebayItem.sellingStatus[0].currentPrice[0]["__value__"]);
  var currencyId = ebayItem.sellingStatus[0].currentPrice[0]["@currencyId"]
  var endTime = new Date(ebayItem.listingInfo[0].endTime);
  var newAuction = new Auction({
    itemId: ebayItem.itemId[0],
    title: ebayItem.title[0],
    categoryId: ebayItem.primaryCategory[0].categoryId[0],
    categoryName: ebayItem.primaryCategory[0].categoryName[0],
    galleryURL: ebayItem.galleryURL[0],
    viewItemURL: ebayItem.viewItemURL[0],
    currentPrice: currentPrice,
    currencyId: currencyId,
    endTime: endTime
  })
  newAuction.save();
}

saveAuction({
  "itemId":["201847213077"],
  "title":["EDDIE BO Hook & Sling 7\" NEW VINYL Funky Delicacies New Orleans Funk"],
  "globalId":["EBAY-US"],
  "primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],
  "galleryURL":["http:\/\/thumbs2.ebaystatic.com\/m\/m8in3s8usGKSTjLNf1jV5Hw\/140.jpg"],
  "viewItemURL":["http:\/\/www.ebay.com\/itm\/EDDIE-BO-Hook-Sling-7-NEW-VINYL-Funky-Delicacies-New-Orleans-Funk-\/201847213077"],
  "paymentMethod":["PayPal"],
  "autoPay":["false"],
  "postalCode":["59801"],
  "location":["Missoula,MT,USA"],
  "country":["US"],
  "shippingInfo":[{
    "shippingServiceCost":[{"@currencyId":"USD","__value__":"3.99"}],
    "shippingType":["Flat"],
    "shipToLocations":["Worldwide"],
    "expeditedShipping":["true"],
    "oneDayShippingAvailable":["false"],
    "handlingTime":["1"]
  }],
  "sellingStatus":[{
    "currentPrice":[{"@currencyId":"USD","__value__":"9.99"}],
    "convertedCurrentPrice":[{"@currencyId":"USD","__value__":"9.99"}],
    "sellingState":["Active"],
    "timeLeft":["P24DT6H3M36S"]
  }],
  "listingInfo":[{
    "bestOfferEnabled":["false"],
    "buyItNowAvailable":["false"],
    "startTime":["2017-03-10T02:05:08.000Z"],
    "endTime":["2017-12-05T02:05:08.000Z"],
    "listingType":["FixedPrice"],
    "gift":["false"],
    "watchCount":["5"]}],
    "returnsAccepted":["true"],
    "condition":[{
      "conditionId":["1000"],
      "conditionDisplayName":["New"]
    }],
    "isMultiVariationListing":["false"],
    "topRatedListing":["true"]
  });

module.exports.selectAll = selectAll;
module.exports.saveAuction = saveAuction;