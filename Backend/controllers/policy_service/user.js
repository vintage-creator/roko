const PolicyReg = require("../../models/policyReg");

//Get a single Medical PI policy
const getAPolicyFn = async (req, res) => {
  try {
    const policyId = req.params.id;

    // Find the policy by ID
    const policy = await PolicyReg.findById(policyId);

    // Check if the policy exists
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    // Return the policy data
    res.json({ policy });
  } catch (error) {
    console.error(error);

    // Handle specific errors
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid policy ID" });
    }

    // Handle general errors
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get all Medical PI policies
const getAllPolicyFn = async (req, res) => {
  try {
    // Fetch all policies
    const policies = await PolicyReg.find();

    // Check if policies is empty
    if (policies.length === 0) {
      return res.json({ message: "No policies found" });
    }

    // Return the policies
    res.json({ policies });
  } catch (error) {
    console.error(error);

    // Handle general errors
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  getAPolicyFn,
  getAllPolicyFn,
};
