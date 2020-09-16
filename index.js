const express = require('express');
const { RESPONSE_CODE_SERVICE_UNAVAILABLE } = require('./src/common/constants');
// start db
require('./src/db/mongoose');
//initalise mongoose schemas
require('./src/db/declarations/schema');

const userRouter = require('./src/routers/user');
const authorRouter = require('./src/routers/author');
const publicationRouter = require('./src/routers/publication');
const quotationRouter = require('./src/routers/quotation');


const PORT = process.env.PORT || 3000;
const app = express();
// app.use((req, res, next) => {
//     res.status(RESPONSE_CODE_SERVICE_UNAVAILABLE).send('Site down for maintenance')
// });
app.use(express.json());
app.use(userRouter);
app.use(authorRouter);
app.use(publicationRouter);
app.use(quotationRouter);


app.listen(PORT, () => {
    console.log(`express server running at :- ${PORT}`);
});
