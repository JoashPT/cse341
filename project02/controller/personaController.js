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
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw new Error("Must enter a valid ID to find Persona.");
        }
        const personaId = new ObjectId(req.params.id);
        const personaExist = await mongodb.getDatabase().db().collection('persona').findOne({ _id: new ObjectId(req.params.id) });
        if(!personaExist) {
            throw new Error("Must enter an existing ID to find Persona.");
        }

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
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const createOne = async (req, res) => {
    try {
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
        }
    } catch(error) {
        res.status(500).json(error || 'An error occurred while creating the contact.');
    }
}

const updateOne = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw new Error("Must enter a valid ID to update Persona.");
        }
        
        const personaExist = await mongodb.getDatabase().db().collection('persona').findOne({ _id: new ObjectId(req.params.id) });
        if(!personaExist) {
            throw new Error("Must enter an existing ID to update Persona.");
        }

        try {
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
            }
        } catch (error) {
            res.status(500).json(error || "An error occurred while updating a persona.");
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    
}

const eraseOne = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw new Error("Must enter a valid ID to delete a persona entry.");
        }

        const personaExist = await mongodb.getDatabase().db().collection('persona').findOne({ _id: new ObjectId(req.params.id) });
        if(!personaExist) {
            throw new Error("Must enter an existing ID to delete Persona.");
        }

        try {
            const personaId = new ObjectId(req.params.id);
            const result = await mongodb.getDatabase().db().collection('persona').deleteOne({_id: personaId});
            if (result.deletedCount > 0) {
                res.status(204).send();
            }
        } catch (error) {
            res.status(500).json(result.error || "An error occurred while deleting a persona.");
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
   
}

module.exports = {
    getAll,
    getSingle,
    createOne,
    updateOne,
    eraseOne
}