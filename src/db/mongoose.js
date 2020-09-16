const mongoose = require('mongoose');
const { databaseName } = require('../common/constants');
mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
