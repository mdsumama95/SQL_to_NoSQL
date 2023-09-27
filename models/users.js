const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    isPremiumUser: {
        type: Boolean,
        default: true
      },
   
});

const User = mongoose.model('User', userSchema);
module.exports = User;
//
// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');


// const User = sequelize.define('users', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: Sequelize.STRING,
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password:Sequelize.STRING,
//     ispremiumuser: Sequelize.BOOLEAN,
    
// })
// module.exports = User;
