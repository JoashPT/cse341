const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Music Collection Api',
        description: 'Music Collection Api'
    },
    host: 'localhost:3000',
    schemes: ['http']
}

const outputFile = './swagger.json';
const endPointFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endPointFile, doc);
