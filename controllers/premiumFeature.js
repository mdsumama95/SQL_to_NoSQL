// const User = require('../models/users');
// const Expense = require('../models/expenses');
// const Sequelize=require('sequelize');
// const op = Sequelize.Op;

// const getAllUsers = (req,res)=>{
//     User.findAll()
//      .then(result=>{
//        return res.status(201).json({success:true , data:result})
//      })
//      .catch(err =>{
//        return res.status(500).json({ err, success:false , message:"failed"})
//      })
// }


// const getAllExpenses = (req,res)=>{
//    const userId = req.params.id
//    Expense.findAll({where:{userid:userId}})
//    .then(result=>{
//        return res.status(201).json({success:true , data:result})
//    })
//    .catch(err =>{
//        return res.status(500).json({success:false , data:err})
//    })
// }


// const getReport = (req,res)=>{
//   const todayDate = new Date().setHours(0,0,0,0)
//   const Now = new Date();

//   const userId = req.user.id;
//   Expense.findAll({where:{userid:userId , createdAt:{[op.gt]:todayDate,[op.lt]:Now}}})
//   .then(result =>{
//     res.status(201).json(result)
//   })
//   .catch(err =>{
//     res.status(500).json(err)
//   })

// }


//  const getWeeklyReport = (req,res)=>{
//     const todayDate = new Date().getDate()
//     const weeklyExpense = new Date().setDate(todayDate-7)
//     const Now = new Date();

//     const userId = req.user.id;
//     Expense.findAll({where:{userid:userId , createdAt:{[op.gt]:weeklyExpense,[op.lt]:Now}}})
//     .then(result =>{
//       res.status(201).json(result)
//     })
//     .catch(err =>{
//       res.status(500).json(err)
//     })

// }



// module.exports = {
//     getAllUsers,
//     getAllExpenses,
//     getReport,
//     getWeeklyReport
// }





const Expense = require('../models/expenses'); // Assuming you have a Mongoose model for Expense
const User = require('../models/users'); // Assuming you have a Mongoose model for User


const getAllUsers = async (req, res) => {
  try {
    const result = await User.find();
    return res.status(201).json({ success: true, data: result });
  } catch (err) {
    return res.status(500).json({ err, success: false, message: "failed" });
  }
};
const getAllExpenses = async (req, res) => {
  const userId = req.params.id;
  console.log(userId,"==== 88");
  try {
    const result = await Expense.find({ userId: userId });
    console.log(result,"===== 89");
    return res.status(201).json({ success: true, data: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, data: err });
  }
};

const getReport = async (req, res) => {
  try {
    const todayDate = new Date().setHours(0, 0, 0, 0);
    const Now = new Date();
    // const userId = req.user._id;
    // console.log(userId, " === 104");
     
    const userEmail = req.headers.email;
    const user = await User.findOne({ email: userEmail });
    const userId = user._id;
    console.log(userId, " === 104");
    // Use Mongoose queries to retrieve expenses
    const result = await Expense.find({
      userId: userId,
      createdAt: { $gt: todayDate, $lt: Now }
    });
     console.log(result, "==== 115");
    res.status(201).json(result);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};

const getWeeklyReport = async (req, res) => {
  try {
    const todayDate = new Date().getDate();
    const weeklyExpense = new Date().setDate(todayDate - 7);
    const Now = new Date();
    // const userId = req.user.id;


    const userEmail = req.headers.email;
    const user = await User.findOne({ email: userEmail });
    const userId = user._id;
    // Use Mongoose queries to retrieve weekly expenses
    const result = await Expense.find({
      userId: userId,
      createdAt: { $gt: weeklyExpense, $lt: Now }
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  getAllUsers,
  getAllExpenses,
  getReport,
  getWeeklyReport
}