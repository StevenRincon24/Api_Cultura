const Hotel = require("../models/Hotel");
const { validationResult } = require("express-validator");

exports.createHotel = async (req, res) => {
  console.log("Solitud recibida ", req.body);
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.array(),
      });
    }

    const { name, contact, address, imageUrl } = req.body;
    const hotel = new Hotel(name, contact, address, imageUrl);
    await hotel.save();

    res.status(201).json({
      status: "success",
      data: hotel,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create hotel",
    });
  }
};

exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.getAll();
    res.status(200).json({
      status: "success",
      data: hotels,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve hotels",
    });
  }
};
