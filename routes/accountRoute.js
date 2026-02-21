
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities");
const regValidate = require("../utilities/account-validation");

// router.get("/", utilities.handleErrors(accountController.loggedIn));

router.get("/login", utilities.handleErrors(accountController.buildLogin));
router.get("/register", utilities.handleErrors(accountController.builRegister));
router.get("/edit/:account_id", utilities.handleErrors(accountController.accountUpdateForm));



router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount));
    

router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin));
    
    
    router.post(
        "/update",
         regValidate.registrationRules(),
        regValidate.checkRegData,
        utilities.handleErrors(accountController.accountUpdate)
    );
    
    router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement));
module.exports = router;