const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    alias: [String],
});

module.exports = authorSchema;