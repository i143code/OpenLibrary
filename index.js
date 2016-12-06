var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var AUTHOR_COLLECTION = "authors";

var app = express();
app.use(bodyParser.json());


var db;

mongodb.MongoClient.connect("mongodb://ashish:ashish@ds127998.mlab.com:27998/project2_cloud", function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT ||3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}


app.get("/authors", function(req, res) {
  db.collection(AUTHOR_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});



app.get("/authorsOne", function(req, res) {

  var authorsByvalue = "/works/";
  var id= "OL15678982W";

  // {awards: {$elemMatch: {award:'National Medal', year:1975}}}
  db.collection(AUTHOR_COLLECTION).findOne({ "key":authorsByvalue+id}, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {

      res.status(200).json(doc);
    }
  });
});
