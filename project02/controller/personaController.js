const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    mongodb
        .getDatabase()
        .db()
        .collection('persona')
        .find()
        .toArray()
        .then((list) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(list);
        })
        .catch((err) => {
            if (err) {
                res.status(400).json({message: err});
            }
        })
}

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must enter a valid ID to find Persona.');
    }
    const personaId = new ObjectId(req.params.id);
    mongodb
        .getDatabase()
        .db()
        .collection('persona')
        .find({_id: personaId})
        .toArray()
        .then((persona) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(persona[0])
        })
        .catch((err) => {
            if (err) {
                res.status(400).json({message: err});
            }
        })
}

const createOne = async (req, res) => {
    const personaData = {
        persona: req.body.persona,
        arcana: req.body.arcana,
        level: req.body.level,
        awakenInto: req.body.awakenInto,
        firstAppearance: req.body.firstAppearance,
        user: req.body.user,
        denote: req.body.denote
    };
    const result = await mongodb.getDatabase().db().collection('persona').insertOne(personaData);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'An error occurred while creating the contact.');
    }
}

const updateOne = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must enter a valid ID to update persona.");
    }
    const personaId = new ObjectId(req.params.id);
    const personaData = {
        persona: req.body.persona,
        arcana: req.body.arcana,
        level: req.body.level,
        awakenInto: req.body.awakenInto,
        firstAppearance: req.body.firstAppearance,
        user: req.body.user,
        denote: req.body.denote
    };
    const result = await mongodb.getDatabase().db().collection('persona').replaceOne({_id: personaId}, personaData);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || "An error occurred while updating a persona.");
    }
}

const eraseOne = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must enter a valid ID to delete a persona entry.");
    }
    const personaId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('persona').deleteOne({_id: personaId});
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || "An error occurred while deleting a persona.");
    }
}

module.exports = {
    getAll,
    getSingle,
    createOne,
    updateOne,
    eraseOne
}