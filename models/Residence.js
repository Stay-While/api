const mongoose = require("mongoose");

const ResidenceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    minimum: 0,
  },
  amount: {
    type: Number,
    minimum: 0,
  },
  amountLeft: {
    type: Number,
    minimum: 0,
  },
  image: {
    type: String,
    required: true,
  },
  tenants: [
    {
      name: {
        type: String,
        required: true,
      },
      permitExpiresOn: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Residences", ResidenceSchema);
