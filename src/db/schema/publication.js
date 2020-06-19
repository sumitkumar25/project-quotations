const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicationSchema = new Schema({
    books: Number,
    essays: Number,
    letters: Number,
    miscellaneous: Number
});

module.exports = publicationSchema;