var express = require("express");
var path = require("path");
var stories = require("./stories");
var bodyParser = require("body-parser");

var app = express();

app.use(express.static("public"));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  setTimeout(function() {
    console.log("It's a race.");
    next();
  }, 1000);
  console.log("Who will win.");
});

app.get("/", function(req, res) {
  console.log("A dark horse appears");
  res.sendFile(path.join(__dirname, "story.html"));
});

app.get("/Hi/:name", function(req, res) {
  console.log("Here is the params", req.params);
  var name = req.params.name;
  res.send("Hi " + name);
  res.end();
});
app.get("/Hi", function(req, res) {
  console.log("Here is the query", req.query);
  var name = req.query.name;
  res.send("Hi " + name);
  res.end();
});

app.post("/Hi", function(req, res) {
  console.log("Here is the body", req.body);
  var text = req.body.text;
  res.send("Bonjour " + text);
  res.end();
});

app.get("/cya", function(req, res) {
  res.json(stories);
});

app.post("/cya", function(req, res) {
  console.log("create your story!", req.body);
  stories[req.body.key] = req.body;
  res.json({});
});
app.put("/cya");
app.delete("/cya");

app.listen(3000);
