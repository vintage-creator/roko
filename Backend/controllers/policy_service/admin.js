const PolicyReg = require("../../models/policyReg");

//Create a Medical PI policy
const createPolicyFn = async (req, res) => {
  try {
    const { type, amount, duration, coverage_details, termsAndConditions } =
      req.body;

    // Validate required fields
    if (
      !type ||
      !amount ||
      !duration ||
      !termsAndConditions ||
      !coverage_details
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required except courses" });
    }

    //If there are courses (Populate with course_name, course_description, course_videoLink)
    const coverageData = [
      {
        details: coverage_details,
        courses: Array.from({ length: 3 }, (_, i) => ({
          name: req.body[`course_name_${i + 1}`],
          description: req.body[`course_description_${i + 1}`],
          videoLink: req.body[`course_videoLink_${i + 1}`],
        })),
      },
    ];

    // Create the new policy
    const newPolicy = await PolicyReg.create({
      type,
      amount,
      duration,
      coverage: coverageData,
      termsAndConditions,
    });

    res
      .status(201)
      .json({ message: "Policy created successfully", policy: newPolicy });
  } catch (error) {
    console.error(error);

    // Database error
    res.status(500).json({ message: "Internal server error" });
  }
};

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

//Delete a single Medical PI policy
const deleteAPolicyFn = async (req, res) => {
  try {
    const policyId = req.params.id;

    // Find the policy by ID and delete it
    const deletedPolicy = await PolicyReg.findByIdAndDelete(policyId);

    // Check if the policy exists
    if (!deletedPolicy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    // Return the deleted policy data
    res.json({ message: "Policy deleted successfully", policy: deletedPolicy });
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

//Update a Medical PI policy
const updateAPolicyFn = async (req, res) => {
  try {
    const policyId = req.params.id; 

    const { type, amount, duration, coverage_details, termsAndConditions } =
      req.body;

    // Find the policy by ID
    const policyToUpdate = await PolicyReg.findById(policyId);

    // Check if the policy exists
    if (!policyToUpdate) {
      return res.status(404).json({ message: "Policy not found" });
    }

    // Update only the provided fields
    if (type) policyToUpdate.type = type;
    if (amount) policyToUpdate.amount = amount;
    if (duration) policyToUpdate.duration = duration;
    if (coverage_details) policyToUpdate.coverage_details = coverage_details;
    if (termsAndConditions)
      policyToUpdate.termsAndConditions = termsAndConditions;

    // Save the updated policy
    const updatedPolicy = await policyToUpdate.save();

    // Return the updated policy data
    res.json({ message: "Policy updated successfully", policy: updatedPolicy });
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

module.exports = {
  createPolicyFn,
  getAPolicyFn,
  getAllPolicyFn,
  deleteAPolicyFn,
  updateAPolicyFn,
};
