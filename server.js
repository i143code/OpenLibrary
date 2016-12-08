var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var requestify = require('requestify');
var Client = require('node-rest-client').Client;

var client = new Client();
var ObjectID = mongodb.ObjectID;

var AUTHOR_COLLECTION = "author";

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
      handleError(res, err.message, "Failed to get authors.");
    } else {
      res.status(200).json(docs);
    }
  });
});


//get detailed informtion
app.get("/work/:id", function(req, res) {

 var id = req.params.id;
  var authorsByvalue = "/works/";
  // var id= "OL15678982W";
  // {awards: {$elemMatch: {award:'National Medal', year:1975}}}
  db.collection(AUTHOR_COLLECTION).findOne({ "key":authorsByvalue+id}, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

//find by title
app.get("/search/:word",function(req,res){
  var word = req.params.word;
  //  var authorsByvalue = "/works/";
   // var id= "OL15678982W";

   // {awards: {$elemMatch: {award:'National Medal', year:1975}}}
   db.collection(AUTHOR_COLLECTION).findOne({ "title": word}, function(err, doc) {
     if (err) {
       handleError(res, err.message, "Failed to get contact");
     } else {

       res.status(200).json(doc);
     }
   });
})

//find author name
app.get('/authorname/:id',function(req,res){
     var id = req.params.id;
    client.get("https://openlibrary.org/authors/"+ id+".json", function (data, response) {
    res.status(200).json(data);
  });

})
