const express = require('express');
const app = express();

const userRouter = require('./src/routers/user');
require('./src/db/mongoose')
require('./src/db/schema/user');
require('./src/db/schema/author');
require('./src/db/schema/quotation');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);

// users api

const Author = require('./src/db/models/author');
const Publication = require('./src/db/models/publication');
const Quotation = require('./src/db/models/quotation');

const { RESPONSE_CODE_ERROR, RESPONSE_CODE_SUCCESS_CREATED, RESPONSE_CODE_CATCH_ERROR, RESPONSE_CODE_SUCCESS } = require('./src/db/common/constants');
// creation endpoint


app.post('/author', (req, res) => {
    const author = new Author(req.body);
    author.save()
        .then((r) => {
            res.status(RESPONSE_CODE_SUCCESS_CREATED).send(r)
        })
        .catch(e => {
            res.status(RESPONSE_CODE_ERROR);
            res.send(error);
        })

});

app.post('/quotation', (req, res) => {
    const quotation = new Quotation(req.body);
    console.log(quotation);
    quotation.save()
        .then((r) => {
            res.status(RESPONSE_CODE_SUCCESS_CREATED).send(r)
        })
        .catch(e => {
            res.status(RESPONSE_CODE_ERROR);
            res.send(error);
        })

});


// reading endpoint


app.get('/author', (req, res) => {
    Author.find({})
        .then(users => {
            res.send(users);
        }).catch(e => {
            res.status(RESPONSE_CODE_CATCH_ERROR).send();
        })
});

app.get('/quotation', (req, res) => {
    Quotation.find({})
        .then(quotation => {
            res.send(quotation)
        }).catch(e => {
            res.status(RESPONSE_CODE_CATCH_ERROR).send();
        })
});


app.listen(PORT, () => console.log('express server running at' + PORT));