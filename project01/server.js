const express = require('express');
const mongodb = require('./database');

const app = express();

const port = process.env.PORT || 3000;

app.use('/', require('./index'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {console.log(`Database is listening and running on port ${port}`)});
    }
})