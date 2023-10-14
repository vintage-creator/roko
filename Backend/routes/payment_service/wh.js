const express = require("express");
const router = express.Router();
const whFn = require("../../controllers/payment_service/whFn");

router.post("^/confirm-payment(.html)?", whFn);

module.exports = router;
