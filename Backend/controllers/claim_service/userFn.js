const fs = require("fs");
const ClaimReg = require("../../models/claimReg");
const UserReg = require("../../models/userReg");

//Create a claim
const createClaimFn = async (req, res) => {
  try {
    const { details } = req.body;

    if (!details) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const claimant = req.user._id;

    const user = await UserReg.findById(claimant);
    if (user.paymentStatus === "pending") {
      return res
        .status(401)
        .json({ message: "You have not purchased a policy yet." });
    }

    const supportingDocuments = req.files
      ? req.files.map((file) => file.path)
      : null;

    const newClaim = await ClaimReg.create({
      claimant,
      details,
      supportingDocuments,
    });

    user.claims.push(newClaim);
    await user.save();

    res
      .status(201)
      .json({ message: "Claim submitted successfully", claim: newClaim });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal server error" });
  }
};

//Get a single claim by claimant
const getClaimFn = async (req, res) => {
  try {
    const claimId = req.params.id;
    const claim = await ClaimReg.findOne({
      _id: claimId,
      claimant: req.user._id,
    }).exec();

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    res.status(200).json({ claim });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal server error" });
  }
};

//Get all claims by claimant
const getClaimsFn = async (req, res) => {
  try {
    const claimant = req.user._id;

    const claims = await ClaimReg.find({ claimant }).exec();

    if (!claims || claims.length === 0) {
      return res
        .status(404)
        .json({ message: "No claims found for this claimant" });
    }

    res.status(200).json({ claims });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal server error" });
  }
};

//Delete a claim by claimant
const deleteClaimFn = async (req, res) => {
  try {
    const claimId = req.params.id;
    const claimant = req.user._id;

    const deletedClaim = await ClaimReg.findOneAndDelete({
      _id: claimId,
      claimant,
    }).exec();

    if (!deletedClaim) {
      return res
        .status(404)
        .json({ message: "Claim not found for this claimant" });
    }

    // Delete supporting documents from the server
    if (
      deletedClaim.supportingDocuments &&
      Array.isArray(deletedClaim.supportingDocuments)
    ) {
      deletedClaim.supportingDocuments.forEach((filePath) => {
        fs.unlinkSync(filePath);
      });
    }

    res.status(200).json({ message: "Claim deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Delete all claims by claimant
const deleteClaimsFn = async (req, res) => {
  try {
    const claimant = req.user._id;

    const deletedClaims = await ClaimReg.find({ claimant }).exec();

    if (deletedClaims.length === 0) {
      return res
        .status(404)
        .json({ message: "No claims found for this claimant" });
    }

    // Delete supporting documents from the server
    deletedClaims.forEach((claim) => {
      if (
        claim.supportingDocuments &&
        Array.isArray(claim.supportingDocuments)
      ) {
        claim.supportingDocuments.forEach((filePath) => {
          fs.unlinkSync(filePath);
        });
      }
    });

    // Delete claims from the database
    await ClaimReg.deleteMany({ claimant }).exec();

    res.status(200).json({ message: "All claims deleted successfully" });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createClaimFn,
  getClaimFn,
  getClaimsFn,
  deleteClaimFn,
  deleteClaimsFn,
};
