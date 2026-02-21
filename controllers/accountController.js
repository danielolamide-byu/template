

/* ****************************************
*  Deliver login view
* *************************************** */
const express = require("express")
const app = express()
const utilities = require("../utilities");
const ass = require("../models/account-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// const Util = require("../utilities");
const flash = require("connect-flash");
require("dotenv").config();

app.use(cookieParser());
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
        res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
      } else {
        res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
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





function decodeToken(req, res) {

    const token = req.cookies.jwt; 
    if (!token) {
        return res.status(401).send("No token found in cookies");
    }
    
    
    const decoded = jwt.decode(token);
  console.log(decoded);
  return decoded
}





async function buildManagement(req, res) {
  
  const nav = await utilities.getNav();
  const decodedData = decodeToken(req, res)

    // const accountType = decodedData.account_type;
    const accountFirstname = decodedData.account_lastname
  const accountType = decodedData.account_type
  
    

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
   const decodedData = decodeToken(req, res)

    // const accountType = decodedData.account_type;
    const accountFirstname = decodedData.account_firstname
  
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
  
  async function requiresAdmin(req, res, next) {
    const decodedData = decodeToken(req, res)

    const accountType = decodedData.account_type;
    // const accountFirstname = decodedData.account_firstname
    
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
