const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const sendToken = require('../../utils/jwtToken');
const sendEmail = require('../../utils/sendEmail')
const crypto = require("crypto");
const cloudinary = require("cloudinary");
// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const {isAuthenticatedUser, authorizeRoles} = require('../../middleware/auth')


const keys = require('../../config/keys');

// Load admin model (this is probably the same as importing mongoose & const User = mongoose.model("users"))
const User = require('../../models/User');


// @route   POST api/v1/register
// @desc    Register user
// @access  Public
router.post('/register', async(req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body); // Destructuring

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });


    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar:{
                    public_id:myCloud.public_id,
                    url:myCloud.secure_url
                }
            });
            newUser
            .save()
            .then(user => {
                sendToken(newUser, 201, res);
            })
            .catch(err => console.log(err));

        }
    });
});


// @route   POST api/v1/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', async(req, res) => {
    const { errors, isValid } = validateLoginInput(req.body); // Destructuring

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find  user by email
    User.findOne({ email }).select("+password").then(user => {
        // Check for user
        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }

        // Check Password
         bcrypt.compare(password, user.password).then(isMatched => {
            if (isMatched) {
                // Sign Token: payload(user info), secret key, expiration
                sendToken(user, 200, res);
            } else {
                errors.password = 'Password incorrect';
                return res.status(400).json(errors);
            }
        });
    });
});

// @route   POST api/users/login
// @desc    Log out User / Returning JWT Token
// @access  Public

router.post('/logout', async(req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:"Logged Out"
    })

})

// Forget password 
router.post('/password/forgot', async(req, res)=>{
    const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
        success:false,
        message:"User not found"
    }) 
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Caper Sports Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
        success:false,
        message:error.message
    })
    
  }
});

// Reset paasword
router.put('/password/reset/:token', async(req, res) =>{
    // creating token hash
  const resetPasswordToken = crypto
  .createHash("sha256")
  .update(req.params.token)
  .digest("hex");

const user = await User.findOne({
  resetPasswordToken,
  resetPasswordExpire: { $gt: Date.now() },
});

if (!user) {
    return res.status(400).json({
        success:false,
        message:"Reset Password Token is invalid or has been expired"
    })
}

if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
        success:false,
        message:"Password does not matched"
    })

}

user.password = req.body.password;
user.resetPasswordToken = undefined;
user.resetPasswordExpire = undefined;

await user.save();

sendToken(user, 200, res);

})


// GET User details
router.get('/me', isAuthenticatedUser, async(req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user,
    })
})

// Change password
router.put('/password/update',isAuthenticatedUser, async(req, res) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    
    if (!isPasswordMatched) {
        return res.status(400).json({
            success:false,
            message:"Old password is incorrect"
        })
    
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return res.status(400).json({
        success:false,
        message:"password does not match"
    })
    
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
})

// update user profile
router.put('/me/update', isAuthenticatedUser, async(req, res) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
      };
    
      if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
    
        const imageId = user.avatar.public_id;
    
        await cloudinary.v2.uploader.destroy(imageId);
    
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
    
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    
      const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    
      res.status(200).json({
        success: true,
      });
})

// Get all users(admin)
router.get('/admin/users', isAuthenticatedUser, authorizeRoles("admin"), async (req, res) => {
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      users,
    });
  });
  
  // Get single user (admin)
  router.get('/admin/user/:id', isAuthenticatedUser, authorizeRoles("admin"), async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {

        return res.status(404).json({
            success:false,
            message:`User does not exist with Id: ${req.params.id}`
        })
    }
  
    res.status(200).json({
      success: true,
      user,
    });
  });
  
  // update User Role -- Admin
  router.put('/admin/user/:id', isAuthenticatedUser, authorizeRoles("admin"), async (req, res) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
      });
    });
    
    // Delete User --Admin
    router.delete('/admin/user/:id', isAuthenticatedUser, authorizeRoles("admin"), async (req, res, next) => {
      const user = await User.findById(req.params.id);
    
      if (!user) {
        return res.status(400).json({
            success:false,
            message:`User does not exist with Id: ${req.params.id}`
        })
      }
    
    //   const imageId = user.avatar.public_id;
    
    //   await cloudinary.v2.uploader.destroy(imageId);
    
      await user.remove();
    
      res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
      });
    });


module.exports = router;