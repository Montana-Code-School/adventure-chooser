var express = require("express");
var path = require("path");
var stories = require("./stories");

var app = express();

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "story.html"));
});

app.get("/Hi", function(req, res) {
  res.send("Hi");
  res.end();
});

app.get("/storyList", function(req, res) {
  res.json(stories);
});

app.listen(3000);
