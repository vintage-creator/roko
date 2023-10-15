const express = require("express");
const router = express.Router();
const {signUpFn, verifyToken, signInFn, logoutFn, fgPwdFn, sendfgPwdFn, rsTokenFn, sendRsTokenFn, changePwdFn, sendChangePwdFn} = require("../../controllers/users_auth/authFn");

//Sign up route
router.post("^/signup(.html)?", signUpFn);

//Verify sign up route
router.get("^/verify(.html)?", verifyToken);

//Sign in route
router.post("^/signin(.html)?", signInFn);

//View page for log out route
router.get("^/logout(.html)?", logoutFn);

//Forgot password routes
router.get("^/forgot_password(.html)?", fgPwdFn); //View page for log out route
router.post("^/forgot_password(.html)?", sendfgPwdFn); //Send token route

//Reset token routes
router.get("^/reset-token(.html)?", rsTokenFn); //View page for log out route
router.post("^/reset-token(.html)?", sendRsTokenFn); //Send token route

//Change password routes
router.get("^/change-password(.html)?", changePwdFn); //View page for change password route
router.post("^/change-password(.html)?", sendChangePwdFn); //Send new password route

module.exports = router;
