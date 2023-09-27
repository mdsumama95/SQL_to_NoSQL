
const path = require('path');
const bodyParser = require("body-parser");
const express = require('express');
var cors = require('cors')
const fs = require("fs");
const mongoose = require("mongoose");

const axios = require('axios')

const sequelize = require('./util/database');
const User = require('./models/users');
const Expense = require('./models/expenses');
const Order = require('./models/orders');
const Forgotpassword = require('./models/forgotpassword');




const userRoutes = require('./router/user')
const purchaseRoutes = require('./router/purchase')
const resetPasswordRoutes = require('./router/resetPassword')
const premiumFeatureRoutes = require("./router/premiumFeature")
const expenseRouter = require("./router/expenseRouter")
// const premiumRoutes = require('./router/premiumFeature')


const app = express();
const dotenv = require('dotenv');

// get config vars
dotenv.config();

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
  );

const morgan = require("morgan");
app.use(morgan("combined", { stream: accessLogStream }));

app.use(cors());
// app.use(helmet());



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());  //this is for handling jsons
app.use(express.static("frontend"));

app.use('/user', userRoutes)
app.use('/purchase', purchaseRoutes)
app.use('/password', resetPasswordRoutes);
app.use("/premium", premiumFeatureRoutes); 


// app.use("/expenseHome", expenseRouter);
app.use("/user", expenseRouter);

//

app.use('/', (req, res)=>{
    try{
        console.log("url", req.url);
        res.sendFile(path.join(__dirname, `frontend/${req.url}`));
    }
    catch(e){
        console.log("err is from here 67 aap.js")
    }
})


// User.hasMany(Expense);
// Expense.belongsTo(User);

// User.hasMany(Order);
// Order.belongsTo(User);

// User.hasMany(Forgotpassword);
// Forgotpassword.belongsTo(User);

// process.env.MONGODB
mongoose
  .connect('mongodb+srv://mdsomama:root123@cluster0.gdhzze5.mongodb.net/Expense?retryWrites=true&w=majority')
  .then((result) => {
    console.log("Connected mongodb");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
// sequelize.sync()
//     .then(() => {
//         app.listen(3000);
//     })
//     .catch(err => {
//         console.log(err);
//     })


