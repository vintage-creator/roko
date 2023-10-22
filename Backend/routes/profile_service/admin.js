const express = require("express");
const router = express.Router();
const authenticateUser = require("../../middlewares/authenticateUser");

const {
  getAdminProfileFn,
  getAProfileFn,
  updateAdminProfileFn,
  deleteAdminProfileFn,
  getUserProfilesFn,
  deleteAProfileFn
} = require("../../controllers/profile_service/admin");


//Get admin profile route
router.get("/getprofile", authenticateUser(["admin"]), getAdminProfileFn);

//Update admin profile route
router.put("/updateprofile", authenticateUser(["admin"]), updateAdminProfileFn);

//Delete admin profile route
router.delete("/rmprofile", authenticateUser(["admin"]), deleteAdminProfileFn);

//Get a user profile route
router.get("/getaprofile/:id", authenticateUser(["admin"]), getAProfileFn);

//Get all user profiles route
router.get("/getuserprofiles", authenticateUser(["admin"]), getUserProfilesFn);

//Delete a user's profile route
router.delete("/rmprofile/:id", authenticateUser(["admin"]), deleteAProfileFn);

module.exports = router;
