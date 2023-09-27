const Expense = require('../models/expenses'); // Assuming you have a Mongoose model for Expense
const User = require('../models/users'); // Assuming you have a Mongoose model for User


const addExpense = async (req, res) => {
    try {
        const { amount, description, category } = req.body;
       
        console.log(req.headers.email, " ======= 8 =========");
        const userEmail = req.headers.email;
        const user = await User.findOne({ email: userEmail });
        
        if (!user) {
            // Handle the case where the user is not found
            console.log('User not found');
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        console.log(user._id,"======= ======== ==== 11");
        const userId = user._id;
        const newExpense = new Expense({ amount,  category, description, userId });
        console.log(newExpense,"===== newExpense");
        await newExpense.save();

        if (!user.expenses) {
            user.expenses = []; // Initialize the expenses array if it doesn't exist
        }

        user.expenses.push(newExpense);
        await user.save();
        res.status(201).json({ expense: newExpense, success: true });
    } catch (error) {
        console.error(error);
        res.status(403).json({ success: false, error: error });
    }
};

// const addExpense = async (req, res) => {
//     try {
//         const { amount, description, category } = req.body;
       
//         console.log(req.headers.email, " ======= 8 =========");
//         const userEmail = req.headers.email;
//         const user = await User.findOne({ email: userEmail });
//         console.log(user._id,"======= ======== ==== 11");
//         const userId = user._id;
//         const newExpense = new Expense({ amount,  category, description, userId });
//         console.log(newExpense,"===== newExpense");
//         await newExpense.save();
//         // console.log(req.user.expenses, 'req.user.expenses');
//         user.expenses.push(newExpense);
//         await user.save();
//         res.status(201).json({ expense: newExpense, success: true });
//     } catch (error) {
//         console.error(error);
//         res.status(403).json({ success: false, error: error });
//     }
// };

const getexpenses = async (req, res) => {
    try {
        
        console.log(req.headers.email, " ======= 21");
        const userEmail = req.headers.email;
        const user = await User.findOne({ email: userEmail });
        console.log(user, " 25 in ctrl in getexpenses")
        if (user.isPremiumUser) {
            const expenses = await Expense.find({ userId: user._id });
            return res.status(201).json({ expenses, success: true, message: "Premium user" });
        } else {
            const expenses = await Expense.find({ userId: user._id });
            return res.status(200).json({ expenses, success: true });
        }
    } catch (error) {
        console.error(error);
        res.status(402).json({ error: error, success: false });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.expenseid;
        console.log(req.params, "======= 83");
        if (!expenseId || expenseId.length === 0) {
            return res.status(400).json({ success: false });
        }
        const userEmail = req.headers.email;
        const user = await User.findOne({ email: userEmail });
        const deletedExpense = await Expense.findOneAndDelete({ _id: expenseId, userId: user._id });

        if (!deletedExpense) {
            return res.status(404).json({ success: false, message: 'Expense does not belong to the user' });
        }

        res.status(200).json({ success: true, message: "Deleted Successfully" });
    } catch (error) {
        console.error(error);
        res.status(403).json({ success: false, message: "Failed" });
    }
};

module.exports = {
    addExpense,
    getexpenses,
    deleteExpense
};



// const User = require('../models/users');
// const Expense = require('../models/expenses');
// // const sequelize = require('../util/database');


//     const addExpense = (req, res) => {
//         const {amount, description, category } = req.body;
//         req.user.createExpense({amount, description, category }).then(expense => {
//             return res.status(201).json({expense, success: true } );
//         }).catch(err => {
//             return res.status(403).json({success : false, error: err})
//         })
//     }
//     const getexpenses = async (req, res)=> {
//        try{
//         console.log(req.headers.ispremiumuser, "req.user.ispremiumuser")
//         if(req.headers.ispremiumuser){
//            const expenses = await req.user.getExpenses()
         
//             return res.status(201).json({expenses, success: true, message:"premium hai hai"})
//          }
//          else {
//             const expenses = await req.user.getExpenses()
      
//             return res.status(200).json({expenses, success: true})
//          }
//        }
//         catch(err){
//             return res.status(402).json({ error: err, success: false})
//         } 
//     }
   
   
//     const deleteExpense =  async (req,res) => {
//         try{
//         const expenseid = req.params.expenseid;
//         if(expenseid == undefined || expenseid.length == 0){
//             res.status(400).json({success: false})
//         }
//         const noofrows = await Expense.destroy({where: {id: expenseid, userId: req.user.id}})
//          if(noofrows == 0){
//              return res.status(404).json({success: false, message:'Expense does not belong to the user'})
//          }
//           return res.status(200).json({success: true, message:" Deleted Successfully"})
        
        
//     } catch(err) {
//          console.log(err);
//          return res.status(403).json({success: true, message:"failed"})
//         }
//      }

  
// module.exports = {
//     addExpense,
//     getexpenses,
//     deleteExpense 
// }
