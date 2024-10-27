const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
        
    },

    priceSale: {
        type: Number,
        required: false
        
    },

    gender:{
        type: String,
        required: true,
    },

    code: {
        type: Number,
        required: false,
    },

    inStock: {
        type: Boolean,
        required: true,
        default:true,
      },

    images: [
        {
            public_id:{
                type:String,
                required:true
            },

            url: {
                type: String,
                required: true
            }
        }
    ],

    ratings:{
        type:Number,
        default:0

    },
     
    information: {
        type:String,
        required:true

    },

    description: {
        type:String,
        required:true,
    }, 

    createdAt:{
        type: Date,
        default:Date.now
    },

    numOfReviews:{
        type:Number,
        default:0
    },

    reviews:[
        {
            user: {
              type: mongoose.Schema.ObjectId,
              ref: "User",
              required: true,
            },

            userAvatarUrl:{
                type:String,
                required:true

            },

            name: {
              type: String,
              required: true,
            },
            rating: {
              type: Number,
              required: true,
            },
            comment: {
              type: String,
              required: true,
            },

            reviewCreatedAt:{
                type: Date,
                default:Date.now
            },
          },
    ],

    user:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },


});

module.exports = mongoose.model('Product', ProductSchema);