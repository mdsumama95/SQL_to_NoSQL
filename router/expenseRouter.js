const express = require("express");
const router = express.Router();
const expenseController = require('../controllers/expense')

const authenticatemiddleware = require('../middleware/auth');
router.use(express.static("frontend"));


// router.get("/", expenseController.HomePage);
//authenticatemiddleware.authenticate
router.post('/addExpense', expenseController.addExpense )

router.get('/getexpenses', expenseController.getexpenses)
router.delete('/deleteExpense/:expenseid',  expenseController.deleteExpense)
module.exports = router;