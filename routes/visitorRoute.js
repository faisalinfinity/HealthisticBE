const express = require("express");
const visitorCountModel = require("../models/visitorCountModel");
const visitorRoute = express.Router();

visitorRoute.post("/", async (req, res) => {
  try {
    let data = await visitorCountModel.find({ ip: req.body.ip });
    if (data.length == 0) {
      let newIP = new visitorCountModel(req.body);
      await newIP.save();
      res.json(await visitorCountModel.find())
    } else {
      res.json(await visitorCountModel.find())
    }
  } catch (error) {
    res.send(error.message);
  }
});


module.exports=visitorRoute
