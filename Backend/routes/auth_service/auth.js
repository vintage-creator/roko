const express = require("express");
const router = express.Router();
const {
  signUpFn,
  verifyToken,
  signInFn,
  logoutFn,
  sendfgPwdFn,
  sendRsTokenFn,
  sendChangePwdFn,
} = require("../../controllers/auth_service/authFn");

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided information.
 *     tags:
 *       - user auth
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 description: User's email address.
 *                 type: string
 *                 format: email
 *                 required: true
 *               password:
 *                 description: User's password.
 *                 type: string
 *                 required: true
 *               confirm_password:
 *                 description: Confirm password.
 *                 type: string
 *                 required: true
 *               protect:
 *                 description: Protection status.
 *                 type: string
 *               fullname:
 *                 description: User's full name.
 *                 type: string
 *               phone:
 *                 description: User's phone number.
 *                 type: string
 *               dateOfBirth:
 *                 description: User's date of birth.
 *                 type: string
 *                 format: date
 *               idType:
 *                 description: Type of ID.
 *                 type: string
 *               idNumber:
 *                 description: ID number.
 *                 type: string
 *               fieldOfPractice:
 *                 description: Field of practice.
 *                 type: string
 *               yearsOfExperience:
 *                 description: Years of experience.
 *                 type: number
 *               hasPreviousLegalAction:
 *                 description: Indicates if user has previous legal action.
 *                 type: boolean
 *               summaryOfLegalAction:
 *                 description: Summary of legal action.
 *                 type: string
 *     responses:
 *       200:
 *         description: You have successfully registered. A verification link has been sent to your email for confirmation.
 *       400:
 *         description: Password should be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, and 1 special character.
 *       401:
 *         description: Unauthorized - User already exists.
 */
router.post("^/signup(.html)?", signUpFn);

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: Verify a registered user
 *     description: Verify user sign up with a valid token.
 *     tags:
 *       - user auth
 *     parameters:
 *       - name: token
 *         description: Verification token sent to user's email.
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Email verified successfully. Redirects to the application's home page.
 *       400:
 *         description: Invalid token. Redirects to the sign-up route.
 */
router.get("^/verify(.html)?", verifyToken);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Sign in a user
 *     description: Sign in with the provided email and password.
 *     tags:
 *       - user auth
 *     parameters:
 *       - name: email
 *         description: User's email address.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Sign in successful. Redirects to the application's home page.
 *       400:
 *         description: Please enter your email and password.
 *       401:
 *         description: User not found or not verified.
 *       500:
 *         description: Email or password is not correct.
 */
router.post("^/signin(.html)?", signInFn);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Log out a user
 *     description: Invalidates a user's session.
 *     tags:
 *       - user auth
 *     responses:
 *       200:
 *         description: Successfully logged out. 
 */
router.get("^/logout(.html)?", logoutFn);


/**
 * @swagger
 * /auth/forgot_password:
 *   post:
 *     summary: Forgot Password 
 *     description: Sends a password reset token to the user's email address.
 *     tags:
 *       - user auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Reset token has been sent to the user's email.
 *         content:
 *           application/json:
 *             example:
 *               message: Reset token has been sent to your email
 *       400:
 *         description: Please enter your email address.
 *         content:
 *           application/json:
 *             example:
 *               message: Please enter your email
 *       404:
 *         description: Email not found, please sign up!
 *         content:
 *           application/json:
 *             example:
 *               message: Email not found, please sign up!
 */
router.post("^/forgot_password(.html)?", sendfgPwdFn);


/**
 * @swagger
 * /auth/reset-token:
 *   post:
 *     summary: Forgot Password's reset token
 *     description: Checks the validity and expiration of a reset token.
 *     tags:
 *       - user auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Enter your new password.
 *         content:
 *           application/json:
 *             example:
 *               message: Enter your new password
 *       400:
 *         description: Please enter reset token.
 *         content:
 *           application/json:
 *             example:
 *               message: Please enter reset token
 *       401:
 *         description: Token is invalid.
 *         content:
 *           application/json:
 *             example:
 *               message: Token is invalid!
 *       500:
 *         description: Token has expired.
 *         content:
 *           application/json:
 *             example:
 *               message: Token has expired!
 */
router.post("^/reset-token(.html)?", sendRsTokenFn);


/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Change Password 
 *     description: Changes user's password using a reset token.
 *     tags:
 *       - user auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               confirm_password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Your password has been changed.
 *         content:
 *           application/json:
 *             example:
 *               message: Your password has been changed
 *       406:
 *         description: Password must have at least 1 capital letter, 1 small letter, 1 special character, and be at least 8 characters long.
 *         content:
 *           application/json:
 *             example:
 *               message: Password must have at least 1 capital letter, 1 small letter, 1 special character, and be at least 8 characters long
 *       500:
 *         description: An error occurred while processing your request.
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while processing your request
 */
router.post("^/change-password(.html)?", sendChangePwdFn);


module.exports = router;
