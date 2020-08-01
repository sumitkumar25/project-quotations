const mongoose = require('mongoose');
const collectionName = 'Publications';
const publicationSchema = require('../schema/publication');
const Publication = mongoose.model(collectionName, publicationSchema);

module.exports = Publication;
