// const Razorpay = require("razorpay");
// const Order = require("../models/orders");
// const userController = require("./user");

// exports.premiumMemberShip = async (req, res) => {
//   try {
//     var rzp = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });
//     console.log(rzp.key_id);
//     console.log(rzp.key_secret);
//     rzp.orders.create({ amount: 5000, currency: "INR" }, (err, order) => {
//       console.log(err);
//       if (err) {
//           return res.status(500).json({message: "error inside rzp"})
//       }
//       req.user.createOrder({ orderid: order.id, status: "PENDING" }).then(() => {
//           return res.status(201).json({ order, key_id: rzp.key_id });
//         })
//         .catch((err) => {
//           throw new Error(err);
//         });
      
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(403).json({ message: "Something went wrong", error: err });
//   }
// };


// exports.updateTransactionStatus = async (req, res ) => {
//   try {
//       const { payment_id, order_id} = req.body;
//       Order.findOne({where : {orderid : order_id}})
//       .then(order => {
//           order.update({ paymentid: payment_id, status: 'SUCCESSFUL'})
//           .then(() => {
//               req.user.update({ispremiumuser: true});
//               return res.status(202).json({sucess: true, message: "Transaction Successful"});
//           }).catch((err)=> {
//               throw new Error(err);
//           })
//       }).catch(err => {
//           throw new Error(err);
//       })
//   } catch (err) {
//       console.log(err);
//       res.status(403).json({ errpr: err, message: 'Sometghing went wrong' })

//   }
// }

const Razorpay = require('razorpay');
const Order = require('../models/orders'); // Import the Mongoose model
const User = require('../models/users');

exports.premiumMemberShip = async (req, res) => {
  try {
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    rzp.orders.create({ amount: 5000, currency: 'INR' }, async (err, order) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error inside rzp' });
      }

      try {
        const userEmail = req.headers.email;
        const user = await User.findOne({ email: userEmail });
         const userId = user._id;
        // const user = req.user; // Assuming "req.user" contains the authenticated user
        const newOrder = new Order({ orderid: order.id, status: 'PENDING', userId });

        await newOrder.save();
        // await user.createOrder(newOrder);

        return res.status(201).json({ order, key_id: rzp.key_id });
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: 'Something went wrong', error: err });
  }
};

exports.updateTransactionStatus = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;

    const order = await Order.findOne({ orderid: order_id });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.updateOne({ paymentid: payment_id, status: 'SUCCESSFUL' });

    // Assuming "req.user" contains the authenticated user
    await req.user.updateOne({ ispremiumuser: true });

    return res.status(202).json({ success: true, message: 'Transaction Successful' });
  } catch (err) {
    console.log(err);
    res.status(403).json({ error: err, message: 'Something went wrong' });
  }
};
