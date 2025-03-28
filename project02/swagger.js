const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Users API',
        description: 'Users API'
    },
    host: 'localhost:3000',
    schemes: ['https']
}

const outputFile = './swagger.json';
const endPointFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endPointFile, doc);