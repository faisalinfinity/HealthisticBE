const mongoose = require("mongoose");

const visitorSchema = mongoose.Schema({
  ip:String,
  country_name:String
});

const visitorCountModel = mongoose.model("portfolio", visitorSchema);

module.exports = visitorCountModel;
