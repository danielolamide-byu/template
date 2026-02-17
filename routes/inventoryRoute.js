
// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities");
const inventoryManagementController = require("../controllers/inventoryManagementController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:invId", invController.getSingleVehicle);
// router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));
// router.get("/edit/:inv_id", utilities.handleErrors(invController.editInventoryView));
// router.post("/update/", invController.updateInventory)



module.exports = router;