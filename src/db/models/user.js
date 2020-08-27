const mongoose = require('mongoose');
const {usersCollectionName} = require('./../common/constants');
const userSchema = require('../schema/user');
const User = mongoose.model(usersCollectionName, userSchema);
module.exports = User;
