const express = require('express');
const bodyParser = require('body-parser')

const mongoClient = require('./src/db/mongo');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/authors', (req, res) => {
    res
})
app.listen(3000, () => console.log('express server running at 3000'));