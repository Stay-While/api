const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ["Tenant", "Landlord"],
  },
  licensePlate: {
    type: String,
    default: "",
  },
  carColor: {
    type: String,
    default: "",
  },
  carModel: {
    type: String,
    default: "",
  },
  carVin: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Users", UserSchema);
