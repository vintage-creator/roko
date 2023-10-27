const express = require("express");
const router = express.Router();
const {contactFn, sendMsgFn} = require("../../controllers/contact_service/contactFn");

router.get("^/us(.html)?", contactFn);

/**
 * @swagger
 * /contact/us:
 *   post:
 *     summary: Send a message to the contact us form
 *     description: Sends a message to the contact us form with the provided details.
 *     tags:
 *       - contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the sender.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the sender.
 *               message:
 *                 type: string
 *                 description: Message content.
 *               subject:
 *                 type: string
 *                 description: Subject of the message.
 *     responses:
 *       200:
 *         description: Message sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Your message has been received, we will reply you shortly!
 *       400:
 *         description: Incomplete message details.
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
 *                   example: Please fill in the details completely
 *       500:
 *         description: Internal server error.
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
 *                   example: Internal server error
 */
router.post("^/us(.html)?", sendMsgFn);

module.exports = router;
