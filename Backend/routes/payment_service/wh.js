const express = require("express");
const router = express.Router();
const {whFn, hmFn} = require("../../controllers/payment_service/whFn");
const changeHTTP = require("../../middlewares/changeHTTP");

router.post("/confirm-payment(.html)?", changeHTTP, whFn);
router.get("/confirm-payment(.html)?", hmFn);

module.exports = router;
