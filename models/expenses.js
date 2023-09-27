const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
      },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;

// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');


// const Expense = sequelize.define('expenses', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     amount: Sequelize.INTEGER,
//     category : Sequelize.STRING,
//     description : Sequelize.STRING,

// })
// module.exports = Expense;