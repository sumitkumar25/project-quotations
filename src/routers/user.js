const { RESPONSE_CODE_ERROR, RESPONSE_CODE_SUCCESS_CREATED, RESPONSE_CODE_CATCH_ERROR, RESPONSE_CODE_SUCCESS } = require('./../../src/db/common/constants');


const express = require('express');
const router = new express.Router();
const User = require('./../../src/db/models/user');

router.post('/user', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(RESPONSE_CODE_SUCCESS_CREATED).send(user);
    } catch (error) {
        console.log('user error',error)
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(RESPONSE_CODE_SUCCESS).send(users)
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
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
        const _user = User.validateUser(req.body.email, req.body.password);
        res.send(_user);
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
})


module.exports = router;