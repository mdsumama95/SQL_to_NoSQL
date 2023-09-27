/*const Sequelize = require('sequelize')
const sequelize = new Sequelize('project', 'root', 'root123@',{
    dialect: "mysql",
    host: "localhost",
  }
)

module.exports = sequelize;*/

const Sequelize = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    dialect: 'mysql',
    host: process.env.DB_HOST,
 });

module.exports = sequelize;
 