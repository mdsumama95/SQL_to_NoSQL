const Razorpay = require("razorpay");
const Order = require("../models/orders");
const userController = require("./user");

exports.premiumMemberShip = async (req, res) => {
  try {
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    console.log(rzp.key_id);
    console.log(rzp.key_secret);
    rzp.orders.create({ amount: 5000, currency: "INR" }, (err, order) => {
      console.log(err);
      if (err) {
          return res.status(500).json({message: "error inside rzp"})
      }
      req.user.createOrder({ orderid: order.id, status: "PENDING" }).then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => {
          throw new Error(err);
        });
      
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Something went wrong", error: err });
  }
};


exports.updateTransactionStatus = async (req, res ) => {
  try {
      const { payment_id, order_id} = req.body;
      Order.findOne({where : {orderid : order_id}})
      .then(order => {
          order.update({ paymentid: payment_id, status: 'SUCCESSFUL'})
          .then(() => {
              req.user.update({ispremiumuser: true});
              return res.status(202).json({sucess: true, message: "Transaction Successful"});
          }).catch((err)=> {
              throw new Error(err);
          })
      }).catch(err => {
          throw new Error(err);
      })
  } catch (err) {
      console.log(err);
      res.status(403).json({ errpr: err, message: 'Sometghing went wrong' })

  }
}
/*
exports.updateTransactionStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ where: { orderid: order_id } });
    const promise1 = order.update({
      paymentid: payment_id,
      status: "SUCCESSFUL",
    });
    const promise2 = await req.user.update({ isPremiumUser: true });

    console.log(req.user.isPremiumUser);



    Promise.all([promise1, promise2]).then(() => {
        return res.status(202).json({
          sucess: true,
          message: "Transaction Successful",
          token: userController.generateAccessToken(userId, undefined, true),
        });
      })
      .catch((error) => {
        throw new Error(error);
      });     
  } 
  catch (err) {
    console.log(err);
    res.status(403).json({ error: err, message: "Sometghing went wrong" });
  }
};
*/