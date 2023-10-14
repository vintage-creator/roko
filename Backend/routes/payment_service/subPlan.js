const express = require("express");
const router = express.Router();
const subPlanFn = require("../../controllers/payment_service/subPlanFn");

router.post("^/plan(.html)?", subPlanFn);

module.exports = router;
