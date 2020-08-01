const mongoose = require('mongoose');
const emailValidator = require("email-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return emailValidator.validate(value)
            }
        }
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = userSchema;