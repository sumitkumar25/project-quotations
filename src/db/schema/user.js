const mongoose = require('mongoose');
const emailValidator = require("email-validator");
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
    }
});

// userSchema.statics.validateUser = async (email, password) => {
//     const _user = User.findOne({ email });
//     if (!_user) {
//         throw new Error('User validation failed');
//     }
//     const passwordMatch = bcrypt.compare(password, _user.password);
//     if(passwordMatch){
//         return _user;
//     }else{
//         throw new Error('User validation failed');
//     }
// }
// userSchema.pre('save', async function (next) {
//     console.log('inside bcrypt this',this)
//     const user = this;
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8);
//     }
//     // console.log('inside bcrypt',user)
//     next();
// });
module.exports = userSchema;