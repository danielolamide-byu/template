

/* ****************************************
*  Deliver login view
* *************************************** */
const utilities = require("../utilities");
const ass = require("../models/account-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Util = require("../utilities");
const flash = require("connect-flash");
require("dotenv").config();

// const acc = require("../models/account-model");
// const { json } = require("body-parser");

async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
    res.render("account/login", {
        title: "Login",
        nav,
    });
};

async function builRegister(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/register", {
      title: "Register",
      nav,
      errors: null
    });
};

async function registerAccount(req, res, next) {
    let nav = await utilities.getNav();
  const { account_firstname, account_lastname, account_email, account_password } = req.body
  

  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }

  const regResult = await ass.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    })
  }
};

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body
  const accountData = await ass.getAccountByEmail(account_email)
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
    })
    return
  }
  try {
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
      if(process.env.NODE_ENV === 'development') {
        res.cookie("jwt", accessToken, { httpOnly: false, maxAge: 3600 * 1000 })
      } else {
        res.cookie("jwt", accessToken, { httpOnly: false, secure: false, maxAge: 3600 * 1000 })
      }
      return res.redirect("/account/")
    }
    else {
      req.flash("message notice", "Please check your credentials and try again.")
      res.status(400).render("account/login", {
        title: "Login",
        nav,
        errors: null,
        account_email,
      })
    }
  } catch (error) {
    throw new Error('Access Forbidden')
  }
};










async function buildManagement(req, res) {
  
    const nav = await utilities.getNav();
    

if (accountType === 'Client') {
    const greet = "Welcome " + accountFirstname
    
    res.render("account/account-management", {
      title: "Account Management",
      nav,
      greet,       
      // acountUpdatePath
    });
    

    if (accountType === 'Employee' || accountType === 'Admin') {
      const greet = "Welcome " + accountFirstname
      const invLink = await utilities.getLink();
      res.render("account/admin-employee-management", {
        title: "Account Management",
        nav,
        greet,
        invLink
        // errors: null
      })
    }
  }
};

async function accountUpdateForm(req, res) {
  // const account_id = req.params.account_id
  // const users = await ass.getAccountUsers(1)
   const id = parseInt(req.params.account_id)
    const data = await ass.getAccountUsers(id)

  const nav = await utilities.getNav();

  res.render("account/updateAccount", {
    title: "Update Account",
    nav,
    data: data,
    errors: null,
    locals: { account_id: data.account_id }  
  });
    
};

async function accountUpdate(req, res) {
  let nav = await utilities.getNav();
  // const account_id = req.params.account_id
   const greet = "Welcome " + accountFirstname
  const { account_id, account_firstname, account_lastname, account_email, account_password } = req.body

  
  
  const updatedInformation = await ass.updateAccount(
    account_id,
    account_firstname,
    account_lastname,
    account_email,
    account_password

  )
  console.log(account_id);

  
  if (updatedInformation) {
    try {
      const itemName = updatedInformation.account_firstname + " account updated"
      req.flash("notice", `The ${itemName} was successfully updated.`)
      res.render("account/account-management", {
        title: "Account Management",
        nav,
        greet
      })
    } catch (error) {
      
   
        // const classificationSelect = await utilities.buildClassificationList(classification_id)
        // const itemName = `${inv_make} ${inv_model}`
        // req.flash("notice", "Sorry, the insert failed.")
        // res.status(501).render("account/updateAccount", {
        // title: "Edit Account",
        // nav,
  
        // errors: null,
        // account_id,
        // account_firstname,
        // account_lastname,
        // account_email,
        console.log("Errorr Errorr Errorr errorr", error)
      }
      
  } else {
    console.log("Error Error Error Error.");
    }

};
//   let nav = await utilities.getNav()
//     const {
//       dream_id,
//       dream_make,
//       dream_model,
//       dream_description,
//       dream_image,
//       dream_thumbnail,
//       dream_price,
//       dream_year,
//       dream_miles,
//       dream_color,

//     } = req.body
//     const updateResult = await invModel.updateInventory(
//       dream_id,  
//       dream_make,
//       dream_model,
//       dream_description,
//       dream_image,
//       dream_thumbnail,
//       dream_price,
//       dream_year,
//       dream_miles,
//       dream_color,
//     )
  
//     if (updateResult) {
//       const itemName = updateResult.inv_make + " " + updateResult.inv_model
//       req.flash("notice", `The ${itemName} was successfully updated.`)
//       res.redirect("/inv/")
//     } else {
//       const classificationSelect = await utilities.buildClassificationList(classification_id)
//       const itemName = `${inv_make} ${inv_model}`
//       req.flash("notice", "Sorry, the insert failed.")
//       res.status(501).render("inventory/edit-inventory", {
//       title: "Edit " + itemName,
//       nav,
//       classificationSelect: classificationSelect,
//       errors: null,
//       inv_id,
//       inv_make,
//       inv_model,
//       inv_year,
//       inv_description,
//       inv_image,
//       inv_thumbnail,
//       inv_price,
//       inv_miles,
//       inv_color,
//       classification_id
//       })
//     }
// };



  

    
  // const link = 
  







const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoxMywiYWNjb3VudF9maXJzdG5hbWUiOiJEb24iLCJhY2NvdW50X2xhc3RuYW1lIjoiRGVuIiwiYWNjb3VudF9lbWFpbCI6ImRvbmRlbkBnbWFpbC5jb20iLCJhY2NvdW50X3R5cGUiOiJDbGllbnQiLCJpYXQiOjE3NzE0NDYwNjIsImV4cCI6MTc3NTA0NjA2Mn0.DOBi-rRFHZo2uA257ycpz75am8Hyhp0EenZC7djprGU";
// const token = invManage.generateUserToken()
// Decode the token (does not verify signature)
const decoded = jwt.decode(token);


// Access the account type (assuming the key is 'accountType' or 'role')
const accountType = decoded.account_type;
const accountFirstname= decoded.account_firstname

async function requiresAdmin(req, res, next) {
  if (accountType === 'Admin' || accountType === 'Employee') {
    next()
    console.log(accountType);
  }
  else {
    console.log("Access Forbidden.")
    res.redirect('/account/login');
  }
};

 








module.exports = { buildLogin, builRegister, registerAccount, accountLogin, buildManagement, requiresAdmin, accountUpdateForm, accountUpdate }
