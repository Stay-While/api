const express = require("express");
const Residence = require("../models/Residence");

const router = express.Router();

// adds a residence to users database
router.post("/add", async (req, res) => {
  try {
    const newResidence = new Residence({
      name: req.body.name,
      owner: req.body.owner,
      price: req.body.price,
      amount: req.body.amount,
      amountLeft: req.body.amountLeft,
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
    const updatedResidence = await Residence.findOne(
      { owner: req.params.owner },
      { $set },
      {
        amountLeft: req.body.amountLeft,
      }
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
