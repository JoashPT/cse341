const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    mongodb
        .getDatabase()
        .db()
        .collection('videogame')
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
            throw new Error('Must enter a valid ID to find videogame music.');
        }
        
        const videogameId = new ObjectId(req.params.id);
        const videogameExist = await mongodb.getDatabase().db().collection('videogame').findOne({ _id: new ObjectId(req.params.id) });
                if(!videogameExist) {
                    throw new Error("Must enter an existing ID to find videogame music.");
                }

        mongodb
            .getDatabase()
            .db()
            .collection('videogame')
            .find({_id: videogameId})
            .toArray()
            .then((videogame) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(videogame[0])
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

const getVideogame = async (req, res) => {
    try {
        mongodb
            .getDatabase()
            .db()
            .collection('videogame')
            .find({videogame: req.params.videogame})
            .toArray()
            .then((videogame) => {
                if (videogame.length === 0) {
                    throw new Error('No song found with the given genre.');
                  }
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(videogame)
            })
            .catch((err) => {
                if (err) {
                    res.status(400).json({error: err.message});
                }
            })
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const createOne = async (req, res) => {
    try {
        const videogameData = {
            title: req.body.title,
            videogame: req.body.videogame,
            composer: req.body.composer,
            date: req.body.date,
            link: req.body.link,
            comment: req.body.comment
        };
        const result = await mongodb.getDatabase().db().collection('videogame').insertOne(videogameData);
        if (result.acknowledged) {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json(error || 'An error occurred while creating the record.');
    }
}

const updateOne = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw new Error("Must enter a valid ID to update videogame music.");
        }

        const videogameExist = await mongodb.getDatabase().db().collection('videogame').findOne({ _id: new ObjectId(req.params.id) });
            if(!videogameExist) {
                throw new Error("Must enter an existing ID to update videogame music.");
            }
        
        try {
            const videogameId = new ObjectId(req.params.id);
            const videogameData = {
                title: req.body.title,
                videogame: req.body.videogame,
                composer: req.body.composer,
                date: req.body.date,
                link: req.body.link,
                comment: req.body.comment
            };
            const result = await mongodb.getDatabase().db().collection('videogame').replaceOne({_id: videogameId}, videogameData);
            if (result.modifiedCount > 0) {
                res.status(204).send();
            }
        } catch (error) {
            res.status(500).json(error || "An error occurred while updating a record.");
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const eraseOne = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw new Error("Must enter a valid ID to delete an entry.");
        }

        const videogameExist = await mongodb.getDatabase().db().collection('videogame').findOne({ _id: new ObjectId(req.params.id) });
        if(!videogameExist) {
            throw new Error("Must enter an existing ID to delete an entry.");
        }

        try {
            const videogameId = new ObjectId(req.params.id);
            const result = await mongodb.getDatabase().db().collection('videogame').deleteOne({_id: videogameId});
            if (result.deletedCount > 0) {
                res.status(204).send();
            }
        } catch (error) {
            res.status(500).json(result.error || "An error occurred while deleting an entry.");
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getAll,
    getSingle,
    getVideogame,
    createOne,
    updateOne,
    eraseOne
}