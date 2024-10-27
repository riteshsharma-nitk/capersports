const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const keys = require('../config/keys');

//Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },

    avatar:{
        public_id:{
            type:String,
            required:false
        },
        url:{
            type:String,
            required:false
        }
    },

    role:{
        type:String,
        default:"user"
    },

    resetPasswordToken:String,

    resetPasswordExpire:Date,

    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

// JWT TOKEN
UserSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, keys.secretOrKey, {
      expiresIn: 3600,
    });
  };

  // Compare Password

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  // Generating Password Reset Token
  UserSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
  };

module.exports = mongoose.model('User', UserSchema);