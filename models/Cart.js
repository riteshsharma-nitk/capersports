const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({

      cartItems: [
        {
          name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          size:{
            type:String,
            required:true,
          },
          image: {
            type: String,
            required: true,
          },
          product: {
            type: Schema.ObjectId,
            ref: "Product",
            required: true,
          },
        },
      ],

      user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
      },

})

module.exports = mongoose.model('Cart', CartSchema);