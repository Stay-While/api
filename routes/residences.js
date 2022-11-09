const express = require("express");
const Residence = require("../models/Residence");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

// adds a residence to users database
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const newResidence = new Residence({
      name: req.body.name,
      owner: req.body.owner,
      price: Number(req.body.price),
      amount: Number(req.body.amount),
      amountLeft: Number(req.body.amountLeft),
      image: req.file.path,
      tenants: [],
    });
    const residence = await newResidence.save();
    res.status(200).json(residence);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// gets all residences from the database
router.get("/all", async (req, res) => {
  try {
    const residences = await Residence.find();
    res.status(200).json(residences);
  } catch (error) {
    console.log(error);
    res.status(304).json(error);
  }
});

// gets a specific residence from the database
router.get("/:owner", async (req, res) => {
  try {
    const residences = await Residence.findOne({ owner: req.params.owner });
    res.status(200).json(residences);
  } catch (error) {
    console.log(error);
    res.status(304).json(error);
  }
});

// update a specific residence from the database
router.patch("/update/:owner", async (req, res) => {
  try {
    const updatedResidence = await Residence.updateOne(
      { owner: req.params.owner },
      { $set: { amountLeft: req.body.amountLeft } }
    );
    res.status(200).json(updatedResidence);
  } catch (error) {
    console.log(error);
    res.status(304).json(error);
  }
});

// adds a residence to users database
router.patch("/addTenant/:owner", async (req, res) => {
  try {
    const tenant = {
      name: req.body.name,
      permitExpiresOn: req.body.permitExpiresOn,
    };
    const updatedResidence = await Residence.updateOne(
      {
        owner: req.params.owner,
      },
      { $push: { tenants: tenant } }
    );
    res.status(200).json(updatedResidence);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// update a specific tenant's permit expiration date
router.patch("/update/:owner/:tenant/:permit", async (req, res) => {
  try {
    const updatedResidence = await Residence.updateOne(
      {
        owner: req.params.owner,
        "tenants.name": req.params.tenant,
      },
      {
        $set: { "tenants.$.permitExpiresOn": req.params.permit },
      }
    );
    res.status(200).json(updatedResidence);
  } catch (error) {
    console.log(error);
    res.status(304).json(error);
  }
});

module.exports = router;
