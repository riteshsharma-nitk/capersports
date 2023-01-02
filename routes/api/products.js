const express = require('express');
const router = express.Router()
const cloudinary = require("cloudinary");

const {isAuthenticatedUser, authorizeRoles} = require('../../middleware/auth')
const ApiFeatures = require('../../utils/apiFeatures')

// Load input validation
const validateProductInput = require('../../validation/product')

// Load models
const Product = require('../../models/Product');


// @route GET api/v1/products
// @desc Get all products
// @access Public

router.get('/products', async(req, res) => {
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

    let products = await apiFeature.query;
    let filteredProductsCount = products.length;
    products = await (apiFeature.query).clone();

    res.status(200).json({
        success:true,
        products,
        productsCount,
        filteredProductsCount,
    })
})


// @route GET api/v1/admin/products
// @desc Get all products for admin
// @access private
router.get("/admin/products", isAuthenticatedUser, authorizeRoles("admin"), async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});


// @route POST api/v1/product/new
// @desc Add new product
// @access Private

router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles("admin"), async(req, res) => {
    const { errors, isValid } = validateProductInput(req.body); //Destructuring

    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images?.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    // Check validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    req.body.user = req.user.id;
    const newProduct = new Product(req.body);
    newProduct
             .save()
             .then(product => {
                res.json({
                  success:true,
                  product});
             })
             .catch(err => console.log(err));
});


module.exports = router;

// @route PUT api/v1/products/:id
// @desc Update product details
// @access Private

router.put('/admin/product/:id', isAuthenticatedUser, authorizeRoles("admin"), async(req, res) => {
    const { errors, isValid } = validateProductInput(req.body); //Destructuring

    // Check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    let product = Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }


    // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product?.images?.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }



    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true, 
        runValidators:true,
    })

    res.status(200).json({
        success:true,
        product
    })

})

// @route DELETE api/v1/products/:id
// @desc delete product
// @access Private

router.delete('/admin/product/:id', isAuthenticatedUser, authorizeRoles("admin"), async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    await product.remove();
    res.status(200).json({
        success:true,
        message:"product deleted successfully"
    })
})


// @route GET api/v1/product/:id
// @desc Get single product
// @access Public

router.get('/product/:id', async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    
    res.status(200).json({
        success:true,
        product
    })

})


// @route GET api/v1/review
// @desc Add or update review
// @access Private
router.put('/review', isAuthenticatedUser, async (req, res) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
        user: req.user._id,
        userAvatarUrl:req.user.avatar.url,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => String(rev.user)=== req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (String(rev.user) === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
      });
    });



// @route GET api/v1/reviews
// @desc Get all review
// @access Public
router.get("/reviews", isAuthenticatedUser, async (req, res) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });


// @route GET api/v1/review/:id
// @desc Delete review
// @access Public
router.delete('/review/:id', isAuthenticatedUser, async (req, res) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
    
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
        success: true,
      });
    });


    module.exports = router;