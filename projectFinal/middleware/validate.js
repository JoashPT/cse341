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

const saveAnime = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        anime: 'required|string',
        band: 'required|string',
        soundtrack: 'string',
        date: 'integer',
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

const saveVideogame = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        videogame: 'required|string',
        composer: 'string',
        date: 'integer',
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
    saveContemporary,
    saveAnime,
    saveVideogame
}