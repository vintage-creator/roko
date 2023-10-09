const express = require("express");
const router = express.Router();
const {signUpFn, verifyToken, signInFn, logoutFn} = require("../controllers/authFn");

router.post("^/signup(.html)?", signUpFn);
router.get("^/verify(.html)?", verifyToken);
router.post("^/signin(.html)?", signInFn);
router.get("^/logout(.html)?", logoutFn);

module.exports = router;
