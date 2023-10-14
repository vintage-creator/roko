const express = require("express");
const router = express.Router();
const {contactFn, sendMsgFn} = require("../../controllers/contact_service/contactFn");

router.get("^/us(.html)?", contactFn);
router.post("^/us(.html)?", sendMsgFn);

module.exports = router;
