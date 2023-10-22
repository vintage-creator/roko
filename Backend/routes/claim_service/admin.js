const express = require("express");
const router = express.Router();
const authenticateUser = require("../../middlewares/authenticateUser");

const {
    getAllClaimants, 
    updateClaim
} = require("../../controllers/claim_service/adminFn");


//Get all claimants route
router.get("/getallclaimants", authenticateUser(["admin"]), getAllClaimants);

//Process a claimant's claims route
router.put("/getaclaimant/claim/:claimId", authenticateUser(["admin"]), updateClaim);


module.exports = router;
