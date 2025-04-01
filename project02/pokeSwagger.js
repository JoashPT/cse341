const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Pokemon Users API',
        description: 'Pokemon Users API'
    },
    host: 'localhost:3000',
    schemes: ['https']
}

const outputFile = './pokeSwagger.json';
const endPointFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endPointFile, doc);