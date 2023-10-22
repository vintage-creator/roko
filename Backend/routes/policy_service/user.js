const express = require("express");
const router = express.Router();

const {
  getAPolicyFn,
  getAllPolicyFn,
} = require("../../controllers/policy_service/user");

//Get a Medical PI policy route
router.get("/getapolicy/:id", getAPolicyFn);

//Get all Medical PI policies route
router.get("/getallpolicies", getAllPolicyFn);

module.exports = router;
