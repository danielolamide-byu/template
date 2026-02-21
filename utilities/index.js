
const invModel = require("../models/inventory-model")
const ass = require("../models/account-model");
const jwt = require("jsonwebtoken")
// const { getCookie } = require("../public/js/inventory")
require("dotenv").config()
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul class= 'navUl'>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a class="navUl" href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */

Util.buildClassificationGrid = async function(data){
  let grid
  grid += '<div class="carsGrid">' 
  if(data.length > 0){
    
    data.forEach(vehicle => { 
      grid += '<div class="carsInfo">' 


      grid += '<a href="/inv/detail/' + vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + ' details"><img class="classificationThumbnail" src="' + vehicle.inv_thumbnail +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2 class="des">'
      grid += '<a class="des" href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
      grid += vehicle.inv_make + ' ' + vehicle.inv_model
      grid += '</h2>'
      grid += '<h4 class="des">' + '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>' + '</h4>'
      grid += '</a>'
      
      // grid += vehicle.inv_description + '</span>'
      grid += '</div>'

      grid += '</div>'
      
    })
    grid += '</div>'
  
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

// Util.buildDream = async function (data) {
//   let grid
//   grid += '<div class="carsGrid">'
//   // if(data.length > 0){
    
//   data.forEach(vehicle => {
//     grid += '<div class="carsInfo">'


//     grid += '<a href="/inv/detail/' + vehicle.dream_id
//       + '" title="View ' + vehicle.dream_make + ' ' + vehicle.dream_model
//       + ' details"><img class="classificationThumbnail" src="' + vehicle.dream_thumbnail + '" alt="Image of ' + vehicle.dream_make + ' ' + vehicle.dream_model
//       + ' on CSE Motors" /></a>'
//     grid += '<div class="namePrice">'
//     grid += '<hr />'
//     grid += '<h2 class="des">'
//     grid += '<a class="des" href="../../inv/detail/' + vehicle.dream_id + '" title="View '
//       + vehicle.dream_make + ' ' + vehicle.dream_model + ' details">'
//     grid += vehicle.dream_make + ' ' + vehicle.dream_model
//     grid += '</h2>'
//     grid += '<h4 class="des">' + '<span>$'
//       + new Intl.NumberFormat('en-US').format(vehicle.dream_price) + '</span>' + '</h4>'
//     grid += '</a>'
      
//     // grid += vehicle.inv_description + '</span>'
//     grid += '</div>'

//     grid += '</div>'
      
//   })
//   grid += '</div>'
  
//   return grid
// };

Util.getDreamCars = async function () {
  let grid;
  grid += '<div class="vehDetail">'
  if (data.length > 0) {
    data.forEach(vehicle => {
      grid += '<div class="carDetails">'
      grid += '<h1 class="make">' + vehicle.dream_make + ' ' + vehicle.dream_model + '</h1>'
      grid += '<div class="detailsGrid">'

      grid += '<div class"infoArea">'
      grid += '<img class="vehImg" src="' + vehicle.dream_image + '" alt="Image of ' + vehicle.dream_make + ' ' + vehicle.dream_model + ' on CSE Motors" />'
      grid += '</div>'

     
    }
   )}
}



Util.details = async function (data) {
  let grid

  grid += '<div class="vehDetail">'

  if (data.length > 0) {
    data.forEach(vehicle => {
      grid += '<div class="carDetails">'
      grid += '<h1 class="make">' + vehicle.inv_make + ' ' + vehicle.inv_model + '</h1>'
      grid += '<div class="detailsGrid">'

      grid += '<div class"infoArea">'
      grid += '<img class="vehImg" src="' + vehicle.inv_image + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model + ' on CSE Motors" />'
      grid += '</div>'
      
      grid += '<div class="vehDes">'

      grid += '<div>'
      grid += '<h2>' + 'Make: ' + vehicle.inv_make + '</h2>'
      grid += '<h2>' + 'Model: ' + vehicle.inv_model + '</h2>'
      grid += '<h2>' + 'Year: ' + vehicle.inv_year + '</h2>'
      grid += '<h2>' + 'Mileage: ' + vehicle.inv_miles + '</h2>'
      grid += '<h2>' + 'Price: ' + '<span>$' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>' + '</h2>'
      grid += '</div>'

      grid += '<div>'
      grid += '<h2>' + "Description: " + '</h2>' + '<h3>' + '<p class="carDescription">' + vehicle.inv_description + '</p>' + '</h3>'
      grid += '</div>'

      grid += '</div>'

      grid += '</div>'

      grid += '</div>'
    })

    grid += '</div>'
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
};


Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  
  return classificationList
  
};
Util.AccId = async function () {
  let link = ""; // Initialize as empty string to avoid "undefined" prefix
  let accountId = await ass.getUserId();
  
  accountId.rows.forEach((row) => {
    const id = row.account_id;
    // link += id; // This concatenates IDs into one long string
    
    link += `<a href="/account/edit/${id}">Manage Account </a>`
    
  }); 
  
  return link;
};

Util.acc = async function (req, res) {
  const accountId = req.params.account_id
  link += `<a href="/account/edit/${accountId}">Manage Account </a>`

}

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, accountData) {
        if (err) {
          req.flash("Please log in")
          res.clearCookie("jwt")
          return res.redirect("/account/login")
        }
        res.locals.accountData = accountData
        res.locals.loggedin = 1
        next()
      })
  } else {
    next()
  }
};

/* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
};


Util.getLink = async function(){
  let link;
  link += '<h3>Inventory Management</h3>'
  link += '<a href="/inv/">Edit Inventory</a>'
 
  return link;
}


// Util.requiresAdmin = (req, res, next) => {
// // Token from header
// const token = req.headers.authorization.split(' ')[1];
//   try {
//     // 1. Verify and decode
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     if (decoded.account_type === 'Client') {
   
//       next();
//     } else {
//       res.render("account/login", {
//         title: "LOGIN"
//       })
//     }
//   } catch (err) {
//     console.log("Invalid Token", err);
//   };
// // };

// Util.requiresAdmin = (req, res, next) => {
//   // Get auth header value
//   const authHeader = req.headers['authorization'];
//   // Check if authHeader is undefined or null, and then check format
//   if (authHeader && authHeader.startsWith('jwt ')) {
//     const token = authHeader.split(' ')[1];
//     // Proceed with token verification (e.g., using jwt.verify)
//     // ... verification logic ...
//    if(decodedUser.account_type = 'Client' ); // Attach user info to request object
//     next();
//   } else {
//     // If no token, or invalid format, return 401 Unauthorized status
//     return res.status(401).json({ error: 'Access token required or invalid format' });
//   }
// }
 
// Example using jsonwebtoken library
// const jwt = require('jsonwebtoken');


const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());


Util.cook = (req, res) => {

    // Instead of document.cookie, use req.cookies
    const cookies = req.headers.cookies;
    console.log(cookies.cookieName); // Get specific cookie
    res.send('Cookies checked');
;
};



// The secret key should be a strong, unguessable string stored in environment variables,
// never hardcoded in the source code.



// Example usage within a login route handler:
/*
// In your login route (e.g., in a Node.js/Express app)
router.post('/login', async (req, res) => {
  // ... authentication logic (verify username and password against database) ...
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // If credentials are valid, generate the token
  const accessToken = generateUserToken(user);

  // Send the token back to the client
  res.json({ token: accessToken });
});
*/



  


 



/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */


Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


module.exports = Util