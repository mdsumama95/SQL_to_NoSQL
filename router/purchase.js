const express = require("express");
const purchaseMembership = require("../controllers/purchase");
const authenticatemiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/premiumMemberShip",authenticatemiddleware.authenticate,purchaseMembership.premiumMemberShip);

router.post("/updateTransactionStatus",authenticatemiddleware.authenticate,purchaseMembership.updateTransactionStatus);

module.exports = router;