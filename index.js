var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var AUTHOR_COLLECTION = "ashish";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database
var db;

mongodb.MongoClient.connect("mongodb://ashish:ashish@ds119578.mlab.com:19578/cloudcomputing2", function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
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

  // {awards: {$elemMatch: {award:'National Medal', year:1975}}}
  db.collection(AUTHOR_COLLECTION).findOne({ "name":"Palmer J. Holden"}, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      // res.status(200).json(doc);
      // JSON.stringify(doc, null, "  ");
      // JSON.stringify(res, null, 2)
      console.log(doc)
    }
  });
});
