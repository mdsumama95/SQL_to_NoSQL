const jwt = require('jsonwebtoken');
const User = require('../models/users'); // Assuming you have a Mongoose model for User

const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }
        
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        
        const user = await User.findById(decodedToken.userId);
        
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }
        
        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

module.exports = {
    authenticate
};


// const jwt = require('jsonwebtoken');
// const User = require('../models/users');


// const authenticate = (req, res, next) => {
      
//   const token = req.header('authorization');
//   console.log('Token:', token);

//     try {    
//        const userid = Number(jwt.verify(token, process.env.TOKEN_SECRET));
//          User.findByPk(userid).then(user => {
//            console.log(JSON.stringify(user));
//             req.user = user;
//             next();
//         }).catch(err => { throw new Error(err)})

//       } catch (err) {
//         console.log('JWT Verification Error !!:', err.message);
//         return res.status(401).json({ success: false });
//       }

// }

// module.exports = {
//     authenticate
// }
// /*
// const jwt = require('jsonwebtoken');
// const User = require("../models/users");

// const authenticate = (req, res, next) => {
//   try {
//     const token = req.header("Authorization");
//     const user = jwt.verify(token, process.env.TOKEN_SECRET);
//     User.findByPk(user.userId).then((user) => {
//       req.user = user;
//       next();
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(401).json({ success: false });
//   }
// };

// module.exports = authenticate;*/

