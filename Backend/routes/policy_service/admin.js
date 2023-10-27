const express = require("express");
const router = express.Router();
const authenticateUser = require("../../middlewares/authenticateUser");

const {
  createPolicyFn,
  getAPolicyFn,
  getAllPolicyFn,
  deleteAPolicyFn,
  updateAPolicyFn,
} = require("../../controllers/policy_service/admin");

/**
 * @swagger
 * components:
 *   schemas:
 *     PolicyReg:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           description: The type of the policy.
 *         amount:
 *           type: number
 *           description: The amount of the policy.
 *         duration:
 *           type: number
 *           description: The duration of the policy.
 *         coverage:
 *           type: string
 *           description: The coverage details of the policy.
 *         termsAndConditions:
 *           type: string
 *           description: The terms and conditions of the policy.
 */

/**
 * @swagger
 * /admin/createapolicy:
 *   post:
 *     summary: Create a Policy
 *     description: Creates a new policy. Restricted to admin users.
 *     tags:
 *       - policy (admin)
 *     security:
 *       - sessionID: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: Type of the policy.
 *               amount:
 *                 type: number
 *                 description: Amount for the policy.
 *               duration:
 *                 type: number
 *                 description: Duration of the policy (in months).
 *               coverage_details:
 *                 type: string
 *                 description: Details of the coverage.
 *               termsAndConditions:
 *                 type: string
 *                 description: Terms and conditions of the policy.
 *               course_name_1:
 *                 type: string
 *                 description: Name of the first course (optional).
 *               course_description_1:
 *                 type: string
 *                 description: Description of the first course (optional).
 *               course_videoLink_1:
 *                 type: string
 *                 description: Video link of the first course (optional).
 *               course_name_2:
 *                 type: string
 *                 description: Name of the second course (optional).
 *               course_description_2:
 *                 type: string
 *                 description: Description of the second course (optional).
 *               course_videoLink_2:
 *                 type: string
 *                 description: Video link of the second course (optional).
 *               course_name_3:
 *                 type: string
 *                 description: Name of the third course (optional).
 *               course_description_3:
 *                 type: string
 *                 description: Description of the third course (optional).
 *               course_videoLink_3:
 *                 type: string
 *                 description: Video link of the third course (optional).
 *     responses:
 *       201:
 *         description: Policy created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Policy created successfully
 *                 policy:
 *                   $ref: '#/components/schemas/PolicyReg'  # Reference to the Policy schema
 *       400:
 *         description: All fields are required except courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All fields are required except courses
 *       500:
 *         description: Internal server error.
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
  "/createapolicy(.html)?",
  authenticateUser(["admin"]),
  createPolicyFn
);


/**
 * @swagger
 * /admin/getapolicy/{id}:
 *   get:
 *     summary: Get a Policy by ID
 *     description: Retrieves policy details by its unique ID. Restricted to admin users.
 *     tags:
 *       - policy (admin)
 *     security:
 *       - sessionID: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the policy to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Policy details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 
 *       400:
 *         description: Invalid policy ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid policy ID
 *       404:
 *         description: Policy not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Policy not found
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
router.get("/getapolicy/:id", authenticateUser(["admin"]), getAPolicyFn);


/**
 * @swagger
 * /admin/getallpolicies:
 *   get:
 *     summary: Get all Policies
 *     description: Retrieves a list of all policies. Restricted to admin users.
 *     tags:
 *       - policy (admin)
 *     security:
 *       - sessionID: []
 *     responses:
 *       200:
 *         description: List of policies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 policies:
 *                   type: array

 *       404:
 *         description: No policies found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No policies found
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
router.get("/getallpolicies", authenticateUser(["admin"]), getAllPolicyFn);


/**
 * @swagger
 * /admin/rmpolicy/{id}:
 *   delete:
 *     summary: Delete a Policy
 *     description: Deletes a policy by its ID. Restricted to admin users.
 *     tags:
 *       - policy (admin)
 *     security:
 *       - sessionID: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the policy to be deleted
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Policy deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Policy deleted successfully

 *       400:
 *         description: Invalid policy ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid policy ID
 *       404:
 *         description: Policy not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Policy not found
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
router.delete("/rmpolicy/:id", authenticateUser(["admin"]), deleteAPolicyFn);


/**
 * @swagger
 * /admin/editpolicy/{id}:
 *   put:
 *     summary: Update a policy by ID
 *     description: Update details of a policy by its ID. Restricted to admin users.
 *     tags:
 *       - policy (admin)
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the policy to update.
 *         required: true
 *         schema:
 *           type: string
 *       - name: type
 *         in: formData
 *         description: New type of the policy.
 *         required: false
 *         type: string
 *       - name: amount
 *         in: formData
 *         description: New amount of the policy.
 *         required: false
 *         type: number
 *       - name: duration
 *         in: formData
 *         description: New duration of the policy.
 *         required: false
 *         type: number
 *       - name: coverage_details
 *         in: formData
 *         description: New coverage details of the policy.
 *         required: false
 *         type: string
 *       - name: termsAndConditions
 *         in: formData
 *         description: New terms and conditions of the policy.
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Policy updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Policy updated successfully
 *                 policy:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     type:
 *                       type: string
 *                     amount:
 *                       type: number
 *                     duration:
 *                       type: number
 *                     coverage_details:
 *                       type: string
 *                     termsAndConditions:
 *                       type: string
 *       400:
 *         description: Invalid policy ID or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid policy ID or missing required fields
 *       404:
 *         description: Policy not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Policy not found
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
router.put("/editpolicy/:id", authenticateUser(["admin"]), updateAPolicyFn);

module.exports = router;
