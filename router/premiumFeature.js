const express = require("express");
const router = express.Router();
const premiumController = require("../controllers/premiumFeature");
const authenticatemiddleware = require("../middleware/auth")

// router.get("/showLeaderBoard", authenticatemiddleware.authenticate, premiumController.showLeaderBoard );



authenticatemiddleware.authenticate,
//LeaderBoard Routes


router.get('/getAllUsers', premiumController.getAllUsers)

router.get('/getAllExpenses/:id',premiumController.getAllExpenses);

//report
router.get('/getReport', premiumController.getReport)

router.get('/getWeeklyReport', premiumController.getWeeklyReport)

module.exports = router;