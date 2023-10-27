const express = require("express");
const router = express.Router();
const authenticateUser = require("../../middlewares/authenticateUser");

const {
  getUserProfileFn,
  updateProfileFn,
  deleteProfileFn,
  getBannerMessageFn
} = require("../../controllers/profile_service/user");


/**
 * @swagger
 * /user/getuserprofile:
 *   get:
 *     summary: Get user profile
 *     description: Get the profile of the authenticated user.
 *     tags:
 *       - profile (user)
 *     security:
 *       - sessionID: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: The user object.
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Indicates a user not found message.
 *                   example: User not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Indicates an internal server error message.
 *                   example: Internal server error
 */
router.get("/getuserprofile", authenticateUser(["user"]), getUserProfileFn);


/**
 * @swagger
 * /user/updateprofile:
 *   put:
 *     summary: Update user profile
 *     description: Update the profile of the authenticated user.
 *     tags:
 *       - profile (user)
 *     security:
 *       - sessionID: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               protect:
 *                 type: string
 *                 description: The updated protect value.
 *                 example: New Protect Value
 *               fullname:
 *                 type: string
 *                 description: The updated full name.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The updated email address.
 *                 example: john.doe@example.com
 *               phone:
 *                 type: string
 *                 description: The updated phone number.
 *                 example: +1234567890
 *               password:
 *                 type: string
 *                 description: The updated password.
 *                 example: newPassword123
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: The updated date of birth (ISO 8601 format).
 *                 example: "2000-01-01"
 *               idType:
 *                 type: string
 *                 description: The updated ID type.
 *                 example: Passport
 *               idNumber:
 *                 type: string
 *                 description: The updated ID number.
 *                 example: ABC12345
 *               fieldOfPractice:
 *                 type: string
 *                 description: The updated field of practice.
 *                 example: Medicine
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Indicates a successful update message.
 *                   example: Profile updated successfully
 *                 user:
 *                   type: object
 *                   description: The updated user object.
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Indicates a user not found message.
 *                   example: User not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Indicates an internal server error message.
 *                   example: Internal server error
 */
router.put("/updateprofile", authenticateUser(["user"]), updateProfileFn);


/**
 * @swagger
 * /user/rmprofile:
 *   delete:
 *     summary: Delete user profile
 *     description: Delete the profile of the authenticated user.
 *     tags:
 *       - profile (user)
 *     security:
 *       - sessionID: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Indicates a successful deletion message.
 *                   example: Profile deleted successfully
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Indicates a user not found message.
 *                   example: User not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Indicates an internal server error message.
 *                   example: Internal server error
 */
router.delete("/rmprofile", authenticateUser(["user"]), deleteProfileFn);


/**
 * @swagger
 * /user/getbannermsg:
 *   get:
 *     summary: Get banner message for user
 *     description: Get a banner message for the authenticated user based on their policy status.
 *     tags:
 *       - Banner notification (user)
 *     security:
 *       - sessionID: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The banner message for the user.
 *                   example: Your policy has expired, John.
 *         examples:
 *           NoPolicy:
 *             value:
 *               message: You are yet to purchase a policy, John.
 *           Renewal:
 *             value:
 *               message: Renew your policy in 5 days.
 *       '204':
 *         description: No Content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: null
 *                   description: Indicates no banner message.
 *                   example: null
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Indicates a user not found message.
 *                   example: User not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Indicates an internal server error message.
 *                   example: Internal server error
 */
router.get("/getbannermsg", authenticateUser(["user"]), getBannerMessageFn);

module.exports = router;
