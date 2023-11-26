// Setting up routes and their controller

const express = require('express');

const router = express.Router();

const controller = require('../controllers/controller');

router.post('/userInput' , controller.input);

router.post('/medicineInput' , controller.addMedicine);

router.get('/getData' , controller.home);

router.delete('/delete/:id', controller.delete);

module.exports = router;
