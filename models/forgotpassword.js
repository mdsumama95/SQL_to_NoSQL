const mongoose = require('mongoose');

const resetPasswordSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
});

const ResetPassword = mongoose.model('ResetPassword', resetPasswordSchema);

module.exports = ResetPassword;

// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");

// const ResetPassword = sequelize.define("ResetPassword", {
//   id: {
//     type: Sequelize.STRING,
//     primaryKey: true,
//     allowNull: false,
//   },
//   isActive: Sequelize.BOOLEAN,
// });

// module.exports = ResetPassword;