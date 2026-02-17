
// Needed Resources 
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const errorController = require('../controllers/errorController');
const utilities = require("../utilities");


// Route to build inventory by classification view

router.get("/500", utilities.handleErrors(errorController.serverError));



module.exports = router;