const mongoose = require("mongoose");

const CountSchema = mongoose.Schema({
  permit: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("count", CountSchema);
