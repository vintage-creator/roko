const express = require("express");
const router = express.Router();
const authenticateUser = require("../../middlewares/authenticateUser");

const {
  createPolicyFn,
  getAPolicyFn,
  getAllPolicyFn,
  deleteAPolicyFn,
  updateAPolicyFn,
} = require("../../controllers/policy_service/admin");

//Create a Medical PI policy route
router.post(
  "/createapolicy(.html)?",
  authenticateUser(["admin"]),
  createPolicyFn
);

//Get a Medical PI policy route
router.get("/getapolicy/:id", getAPolicyFn);

//Get all Medical PI policies route
router.get("/getallpolicies", getAllPolicyFn);

//Delete a Medical PI policy route
router.delete("/rmpolicy/:id", authenticateUser(["admin"]), deleteAPolicyFn);

// //Update a Medical PI policy route
router.put("/editpolicy/:id", authenticateUser(["admin"]), updateAPolicyFn);

module.exports = router;
