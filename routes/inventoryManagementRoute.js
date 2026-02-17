

const utilities = require("../utilities")
const inventoryManagementController = require("../controllers/inventoryManagementController");
// Needed Resources 
const express = require("express")
const router = new express.Router() 


// Route to build inventory by classification view
router.get("/", utilities.handleErrors(inventoryManagementController.vehicleManagement));
router.get("/add-classification", utilities.handleErrors(inventoryManagementController.classificationForm));
router.get("/add-inventory", utilities.handleErrors(inventoryManagementController.inventoryForm));



router.post(
    "/add-classification",
    // regValidate.registrationRules(),
    // regValidate.checkRegData,
    utilities.handleErrors(inventoryManagementController.addClassification));

    
router.post(
    "/add-inventory",
    // regValidate.registrationRules(),
    // regValidate.checkRegData,
    utilities.handleErrors(inventoryManagementController.addInventory))




module.exports = router;