

const utilities = require("../utilities")
const invModel = require("../models/inventory-model");

async function vehicleManagement(req, res, next) {
  const classificationSelect = await utilities.buildClassificationList()
  let nav = await utilities.getNav()
    res.render("inventory/management", {
        title: "Vehicle Management",
      nav,
      errors: null,
      classificationSelect
    });
};

async function classificationForm(req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: 'Add Classification',
    nav,
  })
}

async function addClassification(req, res, next) {
     
        let nav = await utilities.getNav()
  // const { classification_name } = req.body
  const { classification_name } = req.body
  
    
      const addResult = await invModel.addClassification(
        classification_name,
    )
    if (addResult) {
        req.flash(
      "notice",
      `Congratulations, you added a new classification.`)
        res.status(201).render("inventory/management", {
        title: "Add Classification",
        nav,
    });
    } else {
        req.flash("notice", "Sorry, the attempt to add a new classification failed.")
        res.status(501).render("inventory/add-classification", {
        title: "Add Classification",
        nav,
    })
    }
};

async function inventoryForm(req, res, next) {
  let nav = await utilities.getNav();
  const classification_id = req.params.classificationId
  const list = await utilities.buildClassificationList(classification_id)
  res.render("inventory/add-inventory", {
    title: 'Add Inventory',
    nav,
    list,
  })
};


async function addInventory(req, res, next) {
  let nav = await utilities.getNav()
  
      const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
    
      const addResult = await invModel.addInventory(
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
        classification_id
  )
  
    if (addResult) {
        req.flash(
      "notice",
      `Congratulations, you added a new inventory item.`)
        res.status(201).render("inventory/management", {
        title: "Add Classification",
        nav,
        });
      
    } else {
        req.flash("notice", "Sorry, the attempt to add a new inventory item failed.")
        res.status(501).render("inventory/add-inventory", {
        title: "Add Classification",
        nav,
    })
    }
};


   

module.exports = { vehicleManagement, addClassification, classificationForm, addInventory, inventoryForm };