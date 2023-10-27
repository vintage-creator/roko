const express = require("express");
const router = express.Router();

const {
  getAPolicyFn,
  getAllPolicyFn,
} = require("../../controllers/policy_service/user");


/**
 * @swagger
 * /user/getapolicy/{id}:
 *   get:
 *     summary: Get a Policy by ID
 *     description: Retrieves policy details by its unique ID. 
 *     tags:
 *       - policy (user)
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
router.get("/getapolicy/:id", getAPolicyFn);


/**
 * @swagger
 * /admin/getallpolicies:
 *   get:
 *     summary: Get all Policies
 *     description: Retrieves a list of all policies.
 *     tags:
 *       - policy (user)
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
router.get("/getallpolicies", getAllPolicyFn);

module.exports = router;
