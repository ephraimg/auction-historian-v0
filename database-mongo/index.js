require('dotenv').config();
var fs = require('fs');
var request = require('request');
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
  localImage: String,
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

var saveAuction = ebayItem => {
  var localImagePath = './react-client/dist/local-gallery/' + ebayItem.itemId[0] + '.jpg';
  var currentPrice = Number(ebayItem.sellingStatus[0].currentPrice[0]["__value__"]);
  var currencyId = ebayItem.sellingStatus[0].currentPrice[0]["@currencyId"]
  var endTime = new Date(ebayItem.listingInfo[0].endTime);
  var newAuction = new Auction({
    itemId: ebayItem.itemId[0],
    title: ebayItem.title[0],
    categoryId: ebayItem.primaryCategory[0].categoryId[0],
    categoryName: ebayItem.primaryCategory[0].categoryName[0],
    galleryURL: ebayItem.galleryURL[0],
    // localImage: '.\/' + ebayItem.itemId[0] + '.jpg',
    localImage: `./local-gallery/${ebayItem.itemId[0]}.jpg`,
    viewItemURL: ebayItem.viewItemURL[0],
    currentPrice: currentPrice,
    currencyId: currencyId,
    endTime: endTime
  })
  newAuction.save(); 
  request(ebayItem.galleryURL[0]).pipe(fs.createWriteStream(localImagePath));
};

// starter data for testing
var sampleData = [
  {
    "itemId":["112633164758"],
    "title":["EDDIE BO That Certain Someone NEW ORLEANS SOUL FUNK 45 Scram *hear*"],
    "globalId":["EBAY-US"],
    "primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],
    "galleryURL":["http:\/\/thumbs3.ebaystatic.com\/m\/mUNzkU0LXRW8Pni9GBFAXSg\/140.jpg"],
    "viewItemURL":["http:\/\/www.ebay.com\/itm\/EDDIE-BO-Certain-Someone-NEW-ORLEANS-SOUL-FUNK-45-Scram-hear-\/112633164758"],"paymentMethod":["PayPal"],"autoPay":["false"],"postalCode":["70119"],"location":["New Orleans,LA,USA"],
    "country":["US"],
    "shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"4.0"}],"shippingType":["Flat"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["2"]}],
    "sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"14.99"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"14.99"}],"bidCount":["1"],"sellingState":["Active"],"timeLeft":["P2DT0H7M10S"]}],
    "listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2017-11-07T20:08:42.000Z"],"endTime":["2017-11-12T20:08:42.000Z"],"listingType":["Auction"],"gift":["false"],"watchCount":["14"]}],
    "returnsAccepted":["true"],
    "condition":[{"conditionId":["3000"],"conditionDisplayName":["Used"]}],
    "isMultiVariationListing":["false"],
    "topRatedListing":["false"]
  },
  {"itemId":["201847213077"],"title":["EDDIE BO Hook & Sling 7\" NEW VINYL Funky Delicacies New Orleans Funk"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],"galleryURL":["http:\/\/thumbs2.ebaystatic.com\/m\/m8in3s8usGKSTjLNf1jV5Hw\/140.jpg"],"viewItemURL":["http:\/\/www.ebay.com\/itm\/EDDIE-BO-Hook-Sling-7-NEW-VINYL-Funky-Delicacies-New-Orleans-Funk-\/201847213077"],"paymentMethod":["PayPal"],"autoPay":["false"],"postalCode":["59801"],"location":["Missoula,MT,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"3.99"}],"shippingType":["Flat"],"shipToLocations":["Worldwide"],"expeditedShipping":["true"],"oneDayShippingAvailable":["false"],"handlingTime":["1"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"9.99"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"9.99"}],"sellingState":["Active"],"timeLeft":["P24DT6H3M36S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2017-03-10T02:05:08.000Z"],"endTime":["2017-12-05T02:05:08.000Z"],"listingType":["FixedPrice"],"gift":["false"],"watchCount":["5"]}],"returnsAccepted":["true"],"condition":[{"conditionId":["1000"],"conditionDisplayName":["New"]}],"isMultiVariationListing":["false"],"topRatedListing":["true"]
  },
  {"itemId":["322862984616"],"title":["Funk Breaks 45 EDDIE BO Hook And Sling SCRAM HEAR"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],"galleryURL":["http:\/\/thumbs1.ebaystatic.com\/m\/mvqdDT8Pr1p0sp6kNNwFRBw\/140.jpg"],"viewItemURL":["http:\/\/www.ebay.com\/itm\/Funk-Breaks-45-EDDIE-BO-Hook-And-Sling-SCRAM-HEAR-\/322862984616"],"paymentMethod":["PayPal","VisaMC","AmEx","Discover"],"autoPay":["false"],"postalCode":["63114"],"location":["Saint Louis,MO,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"4.0"}],"shippingType":["Flat"],"shipToLocations":["Worldwide"],"expeditedShipping":["true"],"oneDayShippingAvailable":["false"],"handlingTime":["1"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"8.0"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"8.0"}],"bidCount":["1"],"sellingState":["Active"],"timeLeft":["P2DT6H42M35S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2017-11-06T02:44:07.000Z"],"endTime":["2017-11-13T02:44:07.000Z"],"listingType":["Auction"],"gift":["false"],"watchCount":["5"]}],"returnsAccepted":["true"],"condition":[{"conditionId":["3000"],"conditionDisplayName":["Used"]}],"isMultiVariationListing":["false"],"topRatedListing":["true"]
  },
  {"itemId":["142569925253"],"title":["Eddie Bo, I'm So Tired, Ace # 515, vg-"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],"galleryURL":["http:\/\/thumbs2.ebaystatic.com\/m\/m0E35Z-oJUJg_k_iH7HkXEw\/140.jpg"],"viewItemURL":["http:\/\/www.ebay.com\/itm\/Eddie-Bo-Im-So-Tired-Ace-515-vg-\/142569925253"],"paymentMethod":["PayPal"],"autoPay":["false"],"postalCode":["07719"],"location":["Belmar,NJ,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"4.0"}],"shippingType":["FlatDomesticCalculatedInternational"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["2"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"5.0"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"5.0"}],"bidCount":["0"],"sellingState":["Active"],"timeLeft":["P1DT18H49M38S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2017-11-07T14:51:10.000Z"],"endTime":["2017-11-12T14:51:10.000Z"],"listingType":["Auction"],"gift":["false"],"watchCount":["1"]}],"returnsAccepted":["true"],"condition":[{"conditionId":["3000"],"conditionDisplayName":["Used"]}],"isMultiVariationListing":["false"],"topRatedListing":["false"]
  },
  {"itemId":["112632911125"],"title":["EDDIE BO Every Dog Got His Day NEW ORLEANS R&B SOUL 45 *hear*"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],"galleryURL":["http:\/\/thumbs2.ebaystatic.com\/m\/mhODKQdU9HHkKK3ro8UslnA\/140.jpg"],"viewItemURL":["http:\/\/www.ebay.com\/itm\/EDDIE-BO-Every-Dog-Got-His-Day-NEW-ORLEANS-R-B-SOUL-45-hear-\/112632911125"],"paymentMethod":["PayPal"],"autoPay":["false"],"postalCode":["70119"],"location":["New Orleans,LA,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"4.0"}],"shippingType":["Flat"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["2"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"14.99"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"14.99"}],"bidCount":["0"],"sellingState":["Active"],"timeLeft":["P1DT19H59M46S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2017-11-07T16:01:18.000Z"],"endTime":["2017-11-12T16:01:18.000Z"],"listingType":["Auction"],"gift":["false"],"watchCount":["3"]}],"returnsAccepted":["true"],"condition":[{"conditionId":["3000"],"conditionDisplayName":["Used"]}],"isMultiVariationListing":["false"],"topRatedListing":["false"]
  },
  {"itemId":["232551554283"],"title":["Curley Moore Kool Ones 45 Shelley's Rubber Band HOUSE OF THE FOX funk EDDIE BO"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],"galleryURL":["http:\/\/thumbs4.ebaystatic.com\/m\/m73GR6fQ2aLrg35Y8K2A4tg\/140.jpg"],"viewItemURL":["http:\/\/www.ebay.com\/itm\/Curley-Moore-Kool-Ones-45-Shelleys-Rubber-Band-HOUSE-FOX-funk-EDDIE-BO-\/232551554283"],"paymentMethod":["PayPal"],"autoPay":["false"],"postalCode":["87047"],"location":["Sandia Park,NM,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"3.0"}],"shippingType":["Flat"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["1"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"9.99"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"9.99"}],"bidCount":["0"],"sellingState":["Active"],"timeLeft":["P2DT9H47M29S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2017-11-08T05:49:01.000Z"],"endTime":["2017-11-13T05:49:01.000Z"],"listingType":["Auction"],"gift":["false"],"watchCount":["4"]}],"returnsAccepted":["false"],"condition":[{"conditionId":["3000"],"conditionDisplayName":["Used"]}],"isMultiVariationListing":["false"],"topRatedListing":["false"]
  },
  {"itemId":["152777936479"],"title":["Rare EDDIE BO I Cry Oh\/My Heart Was Meant For You Blues Soul R&B"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],"galleryURL":["http:\/\/thumbs4.ebaystatic.com\/m\/mazzWitGxT37S6kXrDz8Hmg\/140.jpg"],"viewItemURL":["http:\/\/www.ebay.com\/itm\/Rare-EDDIE-BO-Cry-Oh-My-Heart-Meant-You-Blues-Soul-R-B-\/152777936479"],"paymentMethod":["PayPal"],"autoPay":["false"],"postalCode":["39667"],"location":["Tylertown,MS,USA"],"country":["US"],"shippingInfo":[{"shippingType":["Calculated"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["3"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"9.99"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"9.99"}],"bidCount":["0"],"sellingState":["Active"],"timeLeft":["P7DT4H17M29S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2017-11-08T00:19:01.000Z"],"endTime":["2017-11-18T00:19:01.000Z"],"listingType":["Auction"],"gift":["false"],"watchCount":["1"]}],"returnsAccepted":["false"],"condition":[{"conditionId":["3000"],"conditionDisplayName":["Used"]}],"isMultiVariationListing":["false"],"topRatedListing":["false"]
  },
  {"itemId":["152612907162"],"title":["EDDIE BO Every Dog Got His Day on RIC R&B 45 Hear"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],"galleryURL":["http:\/\/thumbs3.ebaystatic.com\/m\/mcyZ8JB_j-O01-nhLKzL-ww\/140.jpg"],"viewItemURL":["http:\/\/www.ebay.com\/itm\/EDDIE-BO-Every-Dog-Got-His-Day-RIC-R-B-45-Hear-\/152612907162"],"paymentMethod":["PayPal"],"autoPay":["false"],"postalCode":["45213"],"location":["Cincinnati,OH,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"4.0"}],"shippingType":["Flat"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["2"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"20.0"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"20.0"}],"sellingState":["Active"],"timeLeft":["P21DT22H6M38S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2017-07-05T18:08:10.000Z"],"endTime":["2017-12-02T18:08:10.000Z"],"listingType":["FixedPrice"],"gift":["false"],"watchCount":["4"]}],"returnsAccepted":["true"],"condition":[{"conditionId":["3000"],"conditionDisplayName":["Used"]}],"isMultiVariationListing":["false"],"topRatedListing":["false"]
  },
  {"itemId":["151198537941"],"title":["EDDIE BO - \"PLEASE FORGIVE ME\" b\/w \"I'LL BE SATISFIED\" on APOLLO (M-) "],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],"galleryURL":["http:\/\/thumbs2.ebaystatic.com\/m\/mkzS6KtE6reW06lK3RfxcRA\/140.jpg"],"viewItemURL":["http:\/\/www.ebay.com\/itm\/EDDIE-BO-PLEASE-FORGIVE-ME-b-w-ILL-SATISFIED-APOLLO-M-\/151198537941"],"paymentMethod":["PayPal"],"autoPay":["false"],"postalCode":["70003"],"location":["Metairie,LA,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"3.5"}],"shippingType":["Flat"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["1"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"75.0"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"75.0"}],"sellingState":["Active"],"timeLeft":["P27DT0H6M45S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2013-12-28T20:08:17.000Z"],"endTime":["2017-12-07T20:08:17.000Z"],"listingType":["StoreInventory"],"gift":["false"]}],"returnsAccepted":["true"],"condition":[{"conditionId":["3000"],"conditionDisplayName":["Used"]}],"isMultiVariationListing":["false"],"topRatedListing":["false"]
  },
  {"itemId":["150885452198"],"title":["EDDIE BO - \"YOU'RE THE ONLY\"  b\/w \"YOU'RE WITH ME\" on RIP (VG++)"],"globalId":["EBAY-US"],"primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],"galleryURL":["http:\/\/thumbs3.ebaystatic.com\/m\/m8Cq2omDHsSx_Z1NvMubn1g\/140.jpg"],"viewItemURL":["http:\/\/www.ebay.com\/itm\/EDDIE-BO-YOURE-ONLY-b-w-YOURE-ME-RIP-VG-\/150885452198"],"paymentMethod":["PayPal"],"autoPay":["false"],"postalCode":["70003"],"location":["Metairie,LA,USA"],"country":["US"],"shippingInfo":[{"shippingServiceCost":[{"@currencyId":"USD","__value__":"3.5"}],"shippingType":["Flat"],"shipToLocations":["Worldwide"],"expeditedShipping":["false"],"oneDayShippingAvailable":["false"],"handlingTime":["1"]}],"sellingStatus":[{"currentPrice":[{"@currencyId":"USD","__value__":"30.0"}],"convertedCurrentPrice":[{"@currencyId":"USD","__value__":"30.0"}],"sellingState":["Active"],"timeLeft":["P14DT1H52M42S"]}],"listingInfo":[{"bestOfferEnabled":["false"],"buyItNowAvailable":["false"],"startTime":["2012-08-22T21:54:14.000Z"],"endTime":["2017-11-24T21:54:14.000Z"],"listingType":["StoreInventory"],"gift":["false"],"watchCount":["5"]}],"returnsAccepted":["true"],"condition":[{"conditionId":["3000"],"conditionDisplayName":["Used"]}],"isMultiVariationListing":["false"],"topRatedListing":["false"]
  }
];


sampleData.forEach(auction => saveAuction(auction));


//({
//   "itemId":["201847213077"],
//   "title":["EDDIE BO Hook & Sling 7\" NEW VINYL Funky Delicacies New Orleans Funk"],
//   "globalId":["EBAY-US"],
//   "primaryCategory":[{"categoryId":["176985"],"categoryName":["Records"]}],
//   "galleryURL":["http:\/\/thumbs2.ebaystatic.com\/m\/m8in3s8usGKSTjLNf1jV5Hw\/140.jpg"],
//   "viewItemURL":["http:\/\/www.ebay.com\/itm\/EDDIE-BO-Hook-Sling-7-NEW-VINYL-Funky-Delicacies-New-Orleans-Funk-\/201847213077"],
//   "paymentMethod":["PayPal"],
//   "autoPay":["false"],
//   "postalCode":["59801"],
//   "location":["Missoula,MT,USA"],
//   "country":["US"],
//   "shippingInfo":[{
//     "shippingServiceCost":[{"@currencyId":"USD","__value__":"3.99"}],
//     "shippingType":["Flat"],
//     "shipToLocations":["Worldwide"],
//     "expeditedShipping":["true"],
//     "oneDayShippingAvailable":["false"],
//     "handlingTime":["1"]
//   }],
//   "sellingStatus":[{
//     "currentPrice":[{"@currencyId":"USD","__value__":"9.99"}],
//     "convertedCurrentPrice":[{"@currencyId":"USD","__value__":"9.99"}],
//     "sellingState":["Active"],
//     "timeLeft":["P24DT6H3M36S"]
//   }],
//   "listingInfo":[{
//     "bestOfferEnabled":["false"],
//     "buyItNowAvailable":["false"],
//     "startTime":["2017-03-10T02:05:08.000Z"],
//     "endTime":["2017-12-05T02:05:08.000Z"],
//     "listingType":["FixedPrice"],
//     "gift":["false"],
//     "watchCount":["5"]}],
//     "returnsAccepted":["true"],
//     "condition":[{
//       "conditionId":["1000"],
//       "conditionDisplayName":["New"]
//     }],
//     "isMultiVariationListing":["false"],
//     "topRatedListing":["true"]
//   });

module.exports.Auction = Auction;
module.exports.saveAuction = saveAuction;