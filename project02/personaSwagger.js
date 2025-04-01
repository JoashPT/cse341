const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Persona Users API',
        description: 'Persona Users API'
    },
    host: 'localhost:3000',
    schemes: ['https']
}

const outputFile = './personaSwagger.json';
const endPointFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endPointFile, doc);