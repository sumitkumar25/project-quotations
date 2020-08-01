const { RESPONSE_CODE_ERROR, RESPONSE_CODE_SUCCESS_CREATED, RESPONSE_CODE_CATCH_ERROR, RESPONSE_CODE_SUCCESS } = require('./../../src/db/common/constants');


const express = require('express');
const router = new express.Router();
const Publication = require('./../../src/db/models/publication');

router.post('/publication', async (req, res) => {
    const publication = new Publication(req.body);
    try {
        await publication.save();
        res.status(RESPONSE_CODE_SUCCESS_CREATED).send(publication);
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});

router.get('/publications', async (req, res) => {
    try {
        const publications = await Publication.find({})
        res.status(RESPONSE_CODE_SUCCESS).send(publications)
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});

router.get('/publication/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const publication = await Publication.findById(_id);
        if (publication) {
            res.status(RESPONSE_CODE_SUCCESS).send(publication);
        } else {
            return res.status(RESPONSE_CODE_CATCH_404).send();
        }
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});

router.patch('/publication/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const publication = await Publication.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        if (publication) {
            res.status(RESPONSE_CODE_SUCCESS).send(publication);
        } else {
            return res.status(RESPONSE_CODE_CATCH_404).send();
        }
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});

router.delete('/publication/:id', async (req, res) => {
    try {
        const publication = await Publication.findByIdAndDelete(req.params.id);
        if (publication) {
            res.status(RESPONSE_CODE_SUCCESS).send(publication);
        } else {
            return res.status(RESPONSE_CODE_CATCH_404).send();
        }
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});

module.exports = router;