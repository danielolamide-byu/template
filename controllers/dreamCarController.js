

const utilities = require("../utilities");
const dreamCarModel = require("../models/dreaam-car-model");


async function addDreamCar(req, res) {
    const nav = await utilities.getNav();

    
          const { dream_make, dream_model, dream_year, dream_description, dream_image, dream_thumbnail, dream_price, dream_miles, dream_color } = req.body
        
          const addResult = await dreamCarModel.addDreamCar(
            dream_make,
            dream_model,
            dream_year,
            dream_description,
            dream_image,
            dream_thumbnail,
            dream_price,
            dream_miles,
            dream_color
      )
      
        if (addResult) {
            req.flash(
          "notice",
          `Congratulations, you added a new dream car.`)
            res.status(201).redirect('/')
           
          
        } else {
            req.flash("notice", "Sorry, the attempt to add a new dream car failed.")
            res.status(500).render("dream-car/details", {
            title: "Add Dream Car.",
            nav,
            errors: null
            
        })
        }
    };


async function dreamCarForm(req, res) {
    // let nav = await utilities.getNav()
      let nav = await utilities.getNav()
    res.render("dream-car/details", {
        title: "Add Dream Car",
        nav,
        errors:null
    })
};

async function getDetails(req, res) {


    const dreamCarId = req.params.dream_id
      const data = await dreamCarModel.getDreamCar(dreamCarId)
      const grid = await utilities.getDreamCars(data)
      let nav = await utilities.getNav()
    //   const className = data[0].classification_name
      // className.classList.add('des')
      res.render("dream-car/section", {
        title: " vehicles",
        nav,
        grid,
      })
        
    } 


module.exports = { dreamCarForm, addDreamCar, getDetails };