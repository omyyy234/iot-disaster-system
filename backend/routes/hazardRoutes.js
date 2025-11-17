const express = require("express");
const router = express.Router();
const { predictHazard } = require("../controllers/hazardController");

router.post("/predict", predictHazard);

module.exports = router;
