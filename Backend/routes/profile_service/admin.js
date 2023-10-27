const express = require("express");
const router = express.Router();
const authenticateUser = require("../../middlewares/authenticateUser");

const {
  getAdminProfileFn,
  getAProfileFn,
  updateAdminProfileFn,
  deleteAdminProfileFn,
  getUserProfilesFn,
  deleteAProfileFn
} = require("../../controllers/profile_service/admin");

/**
 * @swagger
 * components:
 *   schemas:
 *     UserReg:
 *       type: object
 *       properties:
 *         fullname:
 *           type: string
 *           description: The full name of the user.
 *         email:
 *           type: string
 *           description: The email address of the user.
 *         phone:
 *           type: string
 *           description: The phone number of the user.
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: The date of birth of the user.
 *         protect:
 *           type: string
 *           description: The protection details for the user.
 *         claims:
 *           type: array
 *           items:
 *             type: string
 *           description: List of claim IDs associated with the user.
 *         paymentStatus:
 *           type: string
 *           description: The payment status of the user (pending/completed).
 *         lastPaymentDate:
 *           type: string
 *           format: date
 *           description: The date of the last payment made by the user.
 */


/**
 * @swagger
 * /admin/getprofile:
 *   get:
 *     summary: Get admin profile
 *     description: Retrieve the profile of an admin user.
 *     tags:
 *       - profile (admin)
 *     security:
 *       - sessionID: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
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
router.get("/getprofile", authenticateUser(["admin"]), getAdminProfileFn);


/**
 * @swagger
 * /admin/updateprofile:
 *   put:
 *     summary: Update admin profile
 *     description: Update the profile of an admin user.
 *     tags:
 *       - profile (admin)
 *     security:
 *       - sessionID: []
 *     requestBody:
 *       description: Admin user profile data for updating.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/UserReg'
 *     responses:
 *       '200':
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Indicates a successful profile update message.
 *                   example: Profile updated successfully.
 *                 user:
 *                   $ref: '#components/schemas/UserReg'
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
 *                   example: User not found.
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
 *                   example: Internal server error.
 */
router.put("/updateprofile", authenticateUser(["admin"]), updateAdminProfileFn);


/**
 * @swagger
 * /admin/rmprofile:
 *   delete:
 *     summary: Delete admin profile
 *     description: Delete the profile of an admin user.
 *     tags:
 *       - profile (admin)
 *     security:
 *       - sessionID: []
 *     responses:
 *       '200':
 *         description: Profile deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Indicates a successful profile deletion message.
 *                   example: Profile deleted successfully.
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
 *                   example: User not found.
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
 *                   example: Internal server error.
 */
router.delete("/rmprofile", authenticateUser(["admin"]), deleteAdminProfileFn);

/**
 * @swagger
 * /admin/getaprofile/{id}:
 *   get:
 *     summary: Admin retrieve a user by ID
 *     description: Get the profile of user by their ID. Restricted to admin users.
 *     tags:
 *       - profile (admin)
 *     security:
 *       - sessionID: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the admin user
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
router.get("/getaprofile/:id", authenticateUser(["admin"]), getAProfileFn);


/**
 * @swagger
 * /admin/getuserprofiles:
 *   get:
 *     summary: Admin retrieve all user profiles
 *     description: Get all user profiles excluding admins. Restricted to admin users.
 *     tags:
 *       - profile (admin)
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
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: User object.
 *                   description: List of user objects.
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
router.get("/getuserprofiles", authenticateUser(["admin"]), getUserProfilesFn);


/**
 * @swagger
 * /admin/rmprofile/{id}:
 *   delete:
 *     summary: Admin delete a user's profile
 *     description: Delete the profile of a user by their ID. Restricted to admin users.
 *     tags:
 *       - profile (admin)
 *     security:
 *       - sessionID: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to be deleted
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
 *                   example: User profile deleted successfully
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
router.delete("/rmprofile/:id", authenticateUser(["admin"]), deleteAProfileFn);

module.exports = router;
