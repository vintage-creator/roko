const express = require("express");
const router = express.Router();
const subPlanFn = require("../../controllers/payment_service/subPlanFn");
const authenticateUser = require("../../middlewares/authenticateUser");

/**
* @swagger
* components:
*   schemas:
*     PaymentReg:
*       type: object
*       properties:
*         ref:
*           type: string
*           description: The reference ID of the payment.
*         fullname:
*           type: string
*           description: The full name of the user making the payment.
*         email:
*           type: string
*           description: The email address of the user making the payment.
*         phone:
*           type: string
*           description: The phone number of the user making the payment.
*         coverage:
*           type: string
*           description: The coverage details associated with the payment.
*         amount:
*           type: string
*           description: The amount of the payment.
*         currency:
*           type: string
*           description: The currency used for the payment.
*         status:
*           type: string
*           description: The status of the payment (pending/completed).
*         paymentLink:
*           type: string
*           description: The link to complete the payment.
*/

/**
 * @swagger
 * /subscribe/plan:
 *   post:
 *     summary: Subscribe to a plan
 *     description: Subscribes a user to a plan and initiates payment through Flutterwave.
 *     tags:
 *       - subscribe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hospitalSize:
 *                 type: string
 *                 enum: ["1-20", "21-50", "51-100", "101-500", "501-1000"]
 *                 description: Size range of the hospital.
 *     responses:
 *       302:
 *         description: Redirects to Flutterwave payment page.
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *               format: uri
 *               description: Payment URL
 *       400:
 *         description: Bad request. User already has a policy or hospital size not provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: You have already purchased a policy
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
router.post("/plan(.html)?", authenticateUser(["user"]), subPlanFn);

module.exports = router;
