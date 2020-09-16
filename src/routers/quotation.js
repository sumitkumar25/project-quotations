const { RESPONSE_CODE_ERROR, RESPONSE_CODE_SUCCESS_CREATED, RESPONSE_CODE_CATCH_ERROR, RESPONSE_CODE_SUCCESS } = require('../common/constants');


const express = require('express');
const router = new express.Router();
const Quotation = require('./../../src/db/models/quotation');

router.post('/quotation', async (req, res) => {
    const quotation = new Quotation(req.body);
    try {
        await quotation.save();
        res.status(RESPONSE_CODE_SUCCESS_CREATED).send(quotation);
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});

router.get('/quotations', async (req, res) => {
    try {
        const quotations = await Quotation.find({})
        res.status(RESPONSE_CODE_SUCCESS).send(quotations)
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});

router.get('/quotation/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const quotation = await Quotation.findById(_id);
        if (quotation) {
            res.status(RESPONSE_CODE_SUCCESS).send(quotation);
        } else {
            return res.status(RESPONSE_CODE_CATCH_404).send();
        }
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});

router.patch('/quotation/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const quotation = await Quotation.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        if (quotation) {
            res.status(RESPONSE_CODE_SUCCESS).send(quotation);
        } else {
            return res.status(RESPONSE_CODE_CATCH_404).send();
        }
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});

router.delete('/quotation/:id', async (req, res) => {
    try {
        const quotation = await Quotation.findByIdAndDelete(req.params.id);
        if (quotation) {
            res.status(RESPONSE_CODE_SUCCESS).send(quotation);
        } else {
            return res.status(RESPONSE_CODE_CATCH_404).send();
        }
    } catch (error) {
        res.status(RESPONSE_CODE_CATCH_ERROR).send(error);
    }
});

module.exports = router;