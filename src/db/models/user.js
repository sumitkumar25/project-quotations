const mongoose = require('mongoose');
const {usersCollectionName} = require('./../common/constants');
const userSchema = require('../schema/user');

// schema methods
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
// schema methods end
const User = mongoose.model(usersCollectionName, userSchema);
module.exports = User;
