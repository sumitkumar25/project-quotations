const { RESPONSE_CODE_ERROR, RESPONSE_CODE_SUCCESS_CREATED, RESPONSE_CODE_CATCH_ERROR, RESPONSE_CODE_SUCCESS } = require('../common/constants');


const express = require('express');
const router = new express.Router();
const User = require('./../../src/db/models/user');
const auth = require('./../middleware/auth');
const commonConstants = require('../common/constants');

router.post('/user', async (req, res) => {
    try {
        const user = new User(req.body);
        const token = await user.generateAuthToken();
        res.status(RESPONSE_CODE_SUCCESS_CREATED).send({ user, token });
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});

router.get('/user/profile', auth, async (req, res) => {
    res.send(req[commonConstants.AUTHENTICATED_USER]);
});

router.get('/user/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (user) {
            res.status(RESPONSE_CODE_SUCCESS).send(user);
        } else {
            return res.status(RESPONSE_CODE_CATCH_404).send();
        }
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});

router.patch('/user/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        Object.keys(req.body).forEach(key => {
            user[key] = req.body[key];
        });
        await user.save();
        // await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        if (user) {
            res.status(RESPONSE_CODE_SUCCESS).send(user);
        } else {
            return res.status(RESPONSE_CODE_CATCH_404).send();
        }
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});

router.delete('/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.status(RESPONSE_CODE_SUCCESS).send(user);
        } else {
            return res.status(RESPONSE_CODE_CATCH_404).send();
        }
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});


router.post('/user/login', async (req, res) => {
    try {
        const user = await User.validateUser(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});

router.post('/user/logout', auth, async (req, res) => {
    try {
        req[commonConstants.AUTHENTICATED_USER].tokens = req[commonConstants.AUTHENTICATED_USER].tokens.filter(t => t.token !== req[commonConstants.AUTHENTICATION_TOKEN_KEY])
        await req[commonConstants.AUTHENTICATED_USER].save()
        res.status(RESPONSE_CODE_SUCCESS).send(req[commonConstants.AUTHENTICATED_USER])
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
})

router.post('/user/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save()
        res.send();
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
})


module.exports = router;