require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// connect to db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () => {
  console.log("connected to db");
});

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

// routes
const usersRoute = require("./routes/users");
const countRoute = require("./routes/count");
app.use("/users", usersRoute);
app.use("/c", countRoute);

app.get("/", (req, res) => {
  const obj = [{ name: "hello" }];
  res.json(obj);
});

// run server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`);
});
