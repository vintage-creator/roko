const express = require("express");
const router = express.Router();
const authenticateUser = require("../../middlewares/authenticateUser");
const upload = require("../../middlewares/fileProcessor");
const {
  createClaimFn,
  getClaimFn,
  getClaimsFn,
  deleteClaimFn,
  deleteClaimsFn,
} = require("../../controllers/claim_service/userFn");

//Create a claim route
router.post(
  "^/submitclaim(.html)?",
  authenticateUser(["user"]),
  upload.array("supportingDocuments", 5),
  createClaimFn
);

//Get a claim route
router.get("/getclaim/:id", authenticateUser(["user"]), getClaimFn);

//Get all claims route
router.get("/getclaims", authenticateUser(["user"]), getClaimsFn);

//Delete a single claim route
router.delete("/rmclaim/:id", authenticateUser(["user"]), deleteClaimFn);

//Delete all claims route
router.delete("/rmclaims", authenticateUser(["user"]), deleteClaimsFn);

module.exports = router;
