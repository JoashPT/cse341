const validator = require('../helpers/validate');

const savePoke = (req, res, next) => {
    const validationRule = {
        pokedexNo: 'required|integer',
        name: 'required|string',
        nickname: 'string',
        level: 'required|integer',
        nature: 'required|string',
        heldItem: 'string',
        originalTrainer: 'required|string'
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation Failed',
                data: err
            })
        } else {
            next();
        }
    })
}

module.exports = {
    savePoke
}