const mongoose = require('mongoose');
const emailValidator = require("email-validator");
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: (value) => {
                if (!emailValidator.validate(value)) {
                    throw new Error('Email is invalid.');
                }
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

userSchema.pre('save', async function (next) {
    try {
        const user = this;
        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 8);
        }
        next();
    } catch (error) {
        throw error;
    }
});
module.exports = userSchema;