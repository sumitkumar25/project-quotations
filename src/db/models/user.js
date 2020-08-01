const mongoose = require('mongoose');
const collectionName = 'Users';
const userSchema = require('../schema/user');
const User = mongoose.model(collectionName, userSchema);

module.exports = User;
