const express = require('express');
const bodyParser = require('body-parser');
const professional = require('./professional');

const port = process.env.PORT || 8080;
const app = express();

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      })
    .use('/professional', professional);

app.listen(port);