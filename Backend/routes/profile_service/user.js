const express = require("express");
const router = express.Router();
const authenticateUser = require("../../middlewares/authenticateUser");

const {
  getUserProfileFn,
  updateProfileFn,
  deleteProfileFn,
  getBannerMessageFn
} = require("../../controllers/profile_service/user");

//Get a profile route
router.get("/getuserprofile", authenticateUser(["user"]), getUserProfileFn);

//Edit a profile route
router.put("/updateprofile/:id", authenticateUser(["user"]), updateProfileFn);

//Delete a profile route
router.delete("/rmprofile/:id", authenticateUser(["user"]), deleteProfileFn);

//Get banner notification message route
router.get("/getbannermsg", authenticateUser(["user"]), getBannerMessageFn);

module.exports = router;
