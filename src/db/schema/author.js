const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicationSchema = require('./publication');

const authorSchema = new Schema({
    name: String,
    alias: [String],
    publications: publicationSchema
});

module.exports = authorSchema;