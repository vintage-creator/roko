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

/**
 * @swagger
 * /user/submitclaim:
 *   post:
 *     summary: Create a claim
 *     description: Submit a claim with supporting documents. Restricted to authenticated users.
 *     tags:
 *       - claim (user)
 *     security:
 *       - sessionID: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: supportingDocuments
 *         in: formData
 *         description: Supporting documents (up to 5 files)
 *         required: true
 *         type: file
 *         format: binary
 *       - name: details
 *         in: formData
 *         description: Claim details
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Claim submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Claim submitted successfully
 *       400:
 *         description: Invalid request or missing details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid request or missing details
 *       403:
 *         description: Access Forbidden (user not authenticated)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Access Forbidden
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post(
  "^/submitclaim(.html)?",
  authenticateUser(["user"]),
  upload.array("supportingDocuments", 5),
  createClaimFn
);


/**
 * @swagger
 * /user/getclaim/{id}:
 *   get:
 *     summary: Get a single claim by claimant
 *     description: Retrieves a single claim based on the provided claim ID. Restricted to authenticated users.
 *     tags:
 *       - claim (user)
 *     security:
 *       - sessionID: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the claim to be retrieved
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Claim retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 claim:
 *                   type: object
 *       404:
 *         description: Claim not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Claim not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/getclaim/:id", authenticateUser(["user"]), getClaimFn);


/**
 * @swagger
 * /user/getclaims:
 *   get:
 *     summary: Get all claims by claimant
 *     description: Retrieves all claims associated with the authenticated claimant user.
 *     tags:
 *       - claim (user)
 *     security:
 *       - sessionID: []
 *     responses:
 *       200:
 *         description: Claims retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 claims:
 *                   type: array
 *       404:
 *         description: No claims found for this claimant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No claims found for this claimant
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/getclaims", authenticateUser(["user"]), getClaimsFn);


/**
 * @swagger
 * /user/rmclaim/{id}:
 *   delete:
 *     summary: Delete a claim by claimant
 *     description: Deletes a claim associated with the authenticated claimant user.
 *     tags:
 *       - claim (user)
 *     security:
 *       - sessionID: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the claim to be deleted
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Claim deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Claim deleted successfully
 *       404:
 *         description: Claim not found for this claimant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Claim not found for this claimant
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.delete("/rmclaim/:id", authenticateUser(["user"]), deleteClaimFn);


/**
 * @swagger
 * /user/rmclaims:
 *   delete:
 *     summary: Delete all claims by claimant
 *     description: Deletes all claims associated with the authenticated claimant user.
 *     tags:
 *       - claim (user)
 *     security:
 *       - sessionID: []
 *     responses:
 *       200:
 *         description: All claims deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All claims deleted successfully
 *       404:
 *         description: No claims found for this claimant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No claims found for this claimant
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.delete("/rmclaims", authenticateUser(["user"]), deleteClaimsFn);

module.exports = router;
