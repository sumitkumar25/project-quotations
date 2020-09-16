const mongoose = require('mongoose');
const { usersCollectionName } = require('../../common/constants');
const { PRIVATE_KEY } = require('../../common/constants');
const userSchema = require('../schema/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// schema methods
userSchema.statics.validateUser = async (email, password) => {
    const _user = await User.findOne({ email }).exec();
    if (!_user) {
        throw new Error('User validation failed');
    }
    const passwordMatch = bcrypt.compare(password, _user.password);
    if (passwordMatch) {
        return _user;
    } else {
        throw new Error('User validation failed test');
    }
};
userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, PRIVATE_KEY);
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (error) {
        throw new Error();
    }
};
// schema methods end
const User = mongoose.model(usersCollectionName, userSchema);
module.exports = User;