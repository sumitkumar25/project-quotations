const mongoose = require('mongoose');
const authorSchema = require('../schema/author');
const collectionName = 'Authors'
const Author = mongoose.model(collectionName, authorSchema);

module.exports = Author;

