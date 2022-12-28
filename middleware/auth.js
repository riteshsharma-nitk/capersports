const jwt = require("jsonwebtoken");
const User = require('../models/User');

const keys = require('../config/keys');

exports.isAuthenticatedUser = (async (req, res, next) => {
    const { token } = req.cookies;
    
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Please login to access this resource"
})

}

const decodedData = jwt.verify(token, keys.secretOrKey);

req.user = await User.findById(decodedData.id);
next();
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
            success:false,
            message:`Role: ${req.user.role} is not allowed to access this resource`
}) 
      
  

    };
    next();
  };
}