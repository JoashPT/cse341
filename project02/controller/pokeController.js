const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    mongodb
        .getDatabase()
        .db()
        .collection('pokemon')
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
            throw new Error('Must enter a valid ID to find Pokemon.');
        }
        
        const pokemonId = new ObjectId(req.params.id);
        const pokemonExist = await mongodb.getDatabase().db().collection('pokemon').findOne({ _id: new ObjectId(req.params.id) });
                if(!pokemonExist) {
                    throw new Error("Must enter an existing ID to find Pokemon.");
                }

        mongodb
            .getDatabase()
            .db()
            .collection('pokemon')
            .find({_id: pokemonId})
            .toArray()
            .then((pokemon) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(pokemon[0])
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
        const pokeData = {
            pokedexNo: req.body.pokedexNo,
            name: req.body.name,
            nickname: req.body.nickname,
            level: req.body.level,
            nature: req.body.nature,
            heldItem: req.body.heldItem,
            originalTrainer: req.body.originalTrainer
        };
        const result = await mongodb.getDatabase().db().collection('pokemon').insertOne(pokeData);
        if (result.acknowledged) {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json(error || 'An error occurred while creating the contact.');
    }
}

const updateOne = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw new Error("Must enter a valid ID to update Pokemon.");
        }

        const pokemonExist = await mongodb.getDatabase().db().collection('pokemon').findOne({ _id: new ObjectId(req.params.id) });
            if(!pokemonExist) {
                throw new Error("Must enter an existing ID to find Pokemon.");
            }
        
        try {
            const pokemonId = new ObjectId(req.params.id);
            const pokeData = {
            pokedexNo: req.body.pokedexNo,
            name: req.body.name,
            nickname: req.body.nickname,
            level: req.body.level,
            nature: req.body.nature,
            heldItem: req.body.heldItem,
            originalTrainer: req.body.originalTrainer
            };
            const result = await mongodb.getDatabase().db().collection('pokemon').replaceOne({_id: pokemonId}, pokeData);
            if (result.modifiedCount > 0) {
                res.status(204).send();
            }
        } catch (error) {
            res.status(500).json(error || "An error occurred while updating a pokemon.");
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const eraseOne = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw new Error("Must enter a valid ID to delete a Pokemon entry.");
        }

        const pokemonExist = await mongodb.getDatabase().db().collection('pokemon').findOne({ _id: new ObjectId(req.params.id) });
        if(!pokemonExist) {
            throw new Error("Must enter an existing ID to delete a Pokemon.");
        }

        try {
            const pokemonId = new ObjectId(req.params.id);
            const result = await mongodb.getDatabase().db().collection('pokemon').deleteOne({_id: pokemonId});
            if (result.deletedCount > 0) {
                res.status(204).send();
            }
        } catch (error) {
            res.status(500).json(result.error || "An error occurred while deleting a pokemon.");
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