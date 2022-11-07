const express = require("express");
const User = require("../models/User");

const router = express.Router();

// adds a user to users database
router.post("/addUser", async (req, res) => {
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
router.get("/getUsers", async (req, res) => {
  try {
    User.find({}, function (err, users) {
      let userMap = {};

      users.forEach(function (user) {
        userMap[user._id] = user;
      });

      res.send(userMap);
    });
  } catch (error) {
    console.log(error);
    res.status(304).json(error);
  }
});

module.exports = router;
