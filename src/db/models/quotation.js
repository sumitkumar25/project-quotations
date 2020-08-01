const mongoose = require('mongoose');
const quotationSchema = require('../schema/quotation');
const collectionName = 'Quotations'
const Quotation = mongoose.model(collectionName, quotationSchema);

module.exports = Quotation;

