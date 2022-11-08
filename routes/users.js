const express = require("express");
const User = require("../models/User");

const router = express.Router();

// adds a user to users database
router.post("/add", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      userType: req.body.userType,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// gets all users from the database
router.get("/all", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(304).json(error);
  }
});

// gets a specific user from the database
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(304).json(error);
  }
});

module.exports = router;
