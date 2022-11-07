const express = require("express");
const Count = require("../models/Count");

const router = express.Router();

router.post("/count", async (req, res) => {
  try {
    const newCount = new Count({
      permit: req.body.permit,
    });
    const count = await newCount.save();
    res.status(200).json(count);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/count", async (req, res) => {
  try {
    const count = await Count.find();

    res.status(200).json(count);
  } catch (error) {
    console.log(error);
    res.status(304).json(error);
  }
});

module.exports = router;
