const jwt = require('jsonwebtoken');
const User = require('./../db/models/user');
const commonConstants = require('./../common/constants');
const auth = async (req, res, next) => {
    try {
        const token = req.header(commonConstants.AUTHENTICATION_HEADER_KEY).replace('Bearer ', '');
        const decode = jwt.verify(token, commonConstants.PRIVATE_KEY);
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token });
        if (user) {
            req[commonConstants.AUTHENTICATED_USER] = user;
            req[commonConstants.AUTHENTICATION_TOKEN_KEY] = token;
        } else {
            throw new Error('Authentication failed');
        }
        next();
    } catch (error) {
        // console.log({ error })
        throw res.status(commonConstants.RESPONSE_CODE_UNAUTHORIZED).send('Authentication failed');
    }
}

module.exports = auth;