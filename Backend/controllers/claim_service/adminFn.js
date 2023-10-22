const ClaimReg = require("../../models/claimReg");
const UserReg = require("../../models/userReg");
const mailer = require("../../config/mailer");

const getAllClaimants = async (req, res) => {
  try {
    const claimants = await ClaimReg.distinct("claimant");

    //Get user profiles and their associated claims
    const userProfiles = await UserReg.find(
      { _id: { $in: claimants } },
      "fullname email phone dateOfBirth protect claims"
    );

    res.status(200).json({ claimants: userProfiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateClaim = async (req, res) => {
  try {
    const claimId = req.params.claimId;
    const { status, remarks } = req.body;
    const processedById = req.session.userId;
    // Retrieve the admin's name
    const admin = await UserReg.findById(processedById);
    const processedBy = {
      id: processedById,
      name: admin.fullname,
    };

    if (!status || !["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    if (status !== "approved" && !remarks) {
      return res
        .status(400)
        .json({ message: "Remark is required for non-approved claims" });
    }

    const updatedClaim = await ClaimReg.findByIdAndUpdate(
      claimId,
      { status, remarks, processedBy: processedBy.id, name: processedBy.name },
      { new: true }
    ).exec();

    if (!updatedClaim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    const claimantInfo = await UserReg.findById(updatedClaim.claimant)
      .select("fullname email")
      .exec();

    if (!claimantInfo) {
      return res
        .status(404)
        .json({ message: "Claimant information not found" });
    }

    res.status(200).json({
      message: "Claim status and remark updated successfully",
      claim: updatedClaim,
    });
    const emailContent = `<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <h3 style="color: #333; text-align: center;">Claim Processed</h3>
    <p style="color: #666; text-align: center;">Dear ${claimantInfo.fullname},</p>
    <p style="color: #666; text-align: center;">We are pleased to inform you that your claim has been successfully processed.</p>
    <p style="color: #666; text-align: center;">Details:</p>
    <ul style="list-style: none; padding: 0; text-align: center;">
        <li><strong>Claim ID:</strong> ${claimId}</li>
        <li><strong>Status:</strong> ${status}</li>
        <li><strong>Remark:</strong> ${remarks}</li>
    </ul>
    <p style="color: #666; text-align: center;">If you have any questions or need further assistance, please don't hesitate to contact us.</p>
    <div style="text-align: center; margin-top: 30px; color: #666;">
        Thank you for choosing Roko.
    </div>
</div>
`;
    mailer(
      claimantInfo.email,
      "Roko: Your Claim has been Processed",
      emailContent
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { getAllClaimants, updateClaim };
