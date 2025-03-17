const express = require('express');
const { body } = require('express-validator');
const hotelController = require('../controllers/hotelController');

const router = express.Router();

// Validation middleware
const validateHotel = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Hotel name is required'),
  body('contact')
    .trim()
    .notEmpty()
    .withMessage('Contact information is required'),
  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL')
];

router.post('/', validateHotel, hotelController.createHotel);
router.get("/", hotelController.getAllHotels);

module.exports = router;