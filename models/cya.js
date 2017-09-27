var mongoose = require("mongoose");

var cyaSchema = mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  created: { type: Date, default: Date() }
});

var Cya = mongoose.model("Cya", cyaSchema);

module.exports = Cya;
