const validator = require('../helpers/validate');

const saveClassical = (req, res, next) => {
    const validationRule = {
        form: 'required|string',
        opus: 'integer',
        number: 'integer',
        key: 'string',
        composer: 'required|string',
        period: 'required|string',
        link: 'string',
        comment: 'string'
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

const saveContemporary = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        album: 'string',
        band: 'required|string',
        date: 'integer',
        genre: 'required|string',
        link: 'string',
        comment: 'string'
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
    saveClassical,
    saveContemporary
}