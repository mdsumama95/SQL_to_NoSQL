const express = require("express");
const router = express.Router();
const expenseController = require('../controllers/expense')

const authenticatemiddleware = require('../middleware/auth');
router.use(express.static("frontend"));


// router.get("/", expenseController.HomePage);
//authenticatemiddleware.authenticate
router.post('/addExpense',authenticatemiddleware.authenticate, expenseController.addExpense )

router.get('/getexpenses',authenticatemiddleware.authenticate, expenseController.getexpenses)
router.delete('/deleteExpense/:expenseid', authenticatemiddleware.authenticate, expenseController.deleteExpense)
module.exports = router;