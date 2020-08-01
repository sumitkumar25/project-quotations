const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quotationSchema = new Schema({
    text: String,
    author: String,
});

module.exports = quotationSchema;