const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');
const pokeSwaggerDocument = require('../pokeSwagger.json');
const personaSwaggerDocument = require('../personaSwagger.json');


router.use('/personapi-docs', swaggerUI.serveFiles(personaSwaggerDocument));
router.get('/personapi-docs', swaggerUI.setup(personaSwaggerDocument));

router.use('/pokeapi-docs', swaggerUI.serveFiles(pokeSwaggerDocument));
router.get('/pokeapi-docs', swaggerUI.setup(pokeSwaggerDocument));



module.exports = router;