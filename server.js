const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const methodOveride = require('method-override')
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')
const user = require('./routes/api/users');
const product = require('./routes/api/products')
const order = require('./routes/api/orders');
const payment = require('./routes/api/payments')

const cloudinary = require("cloudinary");
const keys = require('./config/keys');

var cors = require('cors')

const app = express();

app.use(cors())

// Body parser middleware
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended:true, limit: '50mb'}));
app.use(methodOveride('_method'))
app.use(cookieParser());
app.use(fileUpload());


// DB Config
const db = keys.mongoURI;


// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(`MongoDB Connection Error: ${err}`));


// Cloudinary Config
cloudinary.config({
    cloud_name: keys.cloudinaryName,
    api_key: keys.cloudinaryApiKey,
    api_secret: keys.cloudinaryApiSecret

})

// Passport middleware
app.use(passport.initialize());

// Use routes
app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);







// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    // Load the React index.html built file
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));