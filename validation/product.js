const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProductInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.category = !isEmpty(data.category) ? data.category : '';
    data.information = !isEmpty(data.information) ? data.information : '';
    data.description = !isEmpty(data.description) ? data.description : '';

    if(!Validator.isLength(data.name, {min: 2, max: 150})){
        errors.name = 'Name must be between  2 and 150 characters';
    }

    if(Validator.isEmpty(data.name)){
        errors.name = 'Name field is required';
    }

    if(Validator.isEmpty(data.category)){
        errors.category = 'Category is required';
    }

    if(Validator.isEmpty(data.information)){
        errors.information = 'Product information is required';
    }

    if(Validator.isEmpty(data.description)){
        errors.description = 'Product description is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

    
};