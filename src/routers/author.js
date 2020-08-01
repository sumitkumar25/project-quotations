const { RESPONSE_CODE_ERROR, RESPONSE_CODE_SUCCESS_CREATED, RESPONSE_CODE_CATCH_ERROR, RESPONSE_CODE_SUCCESS } = require('./../../src/db/common/constants');


const express = require('express');
const router = new express.Router();
const Author = require('./../../src/db/models/author');

router.post('/author', async (req, res) => {
    const author = new Author(req.body);
    try {
        await author.save();
        res.status(RESPONSE_CODE_SUCCESS_CREATED).send(author);
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});

router.get('/authors', async (req, res) => {
    try {
        const authors = await Author.find({})
        res.status(RESPONSE_CODE_SUCCESS).send(authors)
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});

router.get('/author/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const author = await Author.findById(_id);
        if (author) {
            res.status(RESPONSE_CODE_SUCCESS).send(author);
        } else {
            return res.status(RESPONSE_CODE_CATCH_404).send();
        }
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});

router.patch('/author/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const author = await Author.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        if (author) {
            res.status(RESPONSE_CODE_SUCCESS).send(author);
        } else {
            return res.status(RESPONSE_CODE_CATCH_404).send();
        }
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});

router.delete('/author/:id', async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (author) {
            res.status(RESPONSE_CODE_SUCCESS).send(author);
        } else {
            return res.status(RESPONSE_CODE_CATCH_404).send();
        }
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});

module.exports = router;