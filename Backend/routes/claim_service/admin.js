const express = require("express");
const router = express.Router();
const authenticateUser = require("../../middlewares/authenticateUser");

const {
    getAllClaimants, 
    updateClaim
} = require("../../controllers/claim_service/adminFn");

/**
 * @swagger
 * components:
 *   schemas:
 *     ClaimReg:
 *       type: object
 *       properties:
 *         claimant:
 *           type: string
 *           description: The ID of the user making the claim.
 *         details:
 *           type: string
 *           description: Details of the claim.
 *         supportingDocuments:
 *           type: array
 *           items:
 *             type: string
 *           description: List of file paths for supporting documents.
 *         status:
 *           type: string
 *           description: The status of the claim (pending/approved/rejected).
 *         remarks:
 *           type: string
 *           description: Remarks for the claim.
 *         processedBy:
 *           type: string
 *           description: The ID of the admin processing the claim.
 *         name:
 *           type: string
 *           description: The name of the admin processing the claim.
 */

/**
 * @swagger
 * /admin/getallclaimants:
 *   get:
 *     summary: Get all claimants 
 *     description: Retrieves information of all users who have submitted a claim. Restricted to admin users.
 *     tags:
 *       - claim (admin)
 *     security:
 *       - sessionID: []
 *     responses:
 *       200:
 *         description: Success. Returns an array of claimant profiles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 claimants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fullname:
 *                         type: string
 *                       email:
 *                         type: string
 *                         format: email
 *                       phone:
 *                         type: string
 *                       dateOfBirth:
 *                         type: string
 *                         format: date
 *                       protect:
 *                         type: string
 *                       claims:
 *                         type: array
 *                         items:
 *                           type: string
 *       401:
 *         description: Unauthorized. User is not authenticated.
 *       403:
 *         description: Forbidden. User is not authorized to access this resource.
 *       500:
 *         description: Internal server error.
 */
router.get("/admin/getallclaimants", authenticateUser(["admin"]), getAllClaimants);


/**
 * @swagger
 * /admin/getaclaimant/claim/{claimId}:
 *   put:
 *     summary: Update claim status and remarks
 *     description: Updates the status and remarks of a claim. Restricted to admin users.
 *     tags:
 *       - claim (admin)
 *     security:
 *       - sessionID: []
 *     parameters:
 *       - name: claimId
 *         in: path
 *         description: ID of the claim to be updated
 *         required: true
 *         schema:
 *           type: string
 *       - name: status
 *         in: formData
 *         description: New status of the claim (pending/approved/rejected)
 *         required: true
 *         type: string
 *       - name: remarks
 *         in: formData
 *         description: Remarks for the claim (required for non-approved claims)
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Claim status and remarks updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 claim:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     status:
 *                       type: string
 *                     remarks:
 *                       type: string
 *                     processedBy:
 *                       type: string
 *                     name:
 *                       type: string
 *       400:
 *         description: Invalid status or missing remarks for non-approved claims
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid status or missing remarks for non-approved claims"
 *       404:
 *         description: Claim not found or claimant information not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Claim not found or claimant information not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.put("/getaclaimant/claim/:claimId", authenticateUser(["admin"]), updateClaim);


module.exports = router;
