const express = require("express");
const router = express.Router();
const {whFn, hmFn} = require("../../controllers/payment_service/whFn");
// const changeHTTP = require("../../middlewares/changeHTTP");

/**
 * @swagger
 * /wh/confirm-payment:
 *   post:
 *     summary: Confirm Payment Webhook
 *     description: Receives and processes payment confirmation webhook from Flutterwave.
 *     tags:
 *       - webhook
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["successful"]
 *                 description: The status of the payment.
 *               txRef:
 *                 type: string
 *                 description: The transaction reference ID.
 *               id:
 *                 type: string
 *                 description: The ID of the transaction.
 *     responses:
 *       200:
 *         description: Webhook processed successfully.
 *       400:
 *         description: Invalid status received or missing required data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid status received.
 *       401:
 *         description: Unauthorized request. Signature verification failed.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: This request is unauthorized!
 *       404:
 *         description: Transaction not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Transaction not found.
 *       500:
 *         description: Webhook received but not a successful transaction.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Webhook received but not a successful transaction.
 *       502:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 */
router.post("/confirm-payment", whFn);




router.get("/paymentStatus", hmFn);

module.exports = router;
