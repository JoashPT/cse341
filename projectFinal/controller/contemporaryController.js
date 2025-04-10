const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    mongodb
        .getDatabase()
        .db()
        .collection('contemporary')
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
            throw new Error('Must enter a valid ID to find contemporary music.');
        }
        
        const contemporaryId = new ObjectId(req.params.id);
        const contemporaryExist = await mongodb.getDatabase().db().collection('contemporary').findOne({ _id: new ObjectId(req.params.id) });
                if(!contemporaryExist) {
                    throw new Error("Must enter an existing ID to find contemporary music.");
                }

        mongodb
            .getDatabase()
            .db()
            .collection('contemporary')
            .find({_id: contemporaryId})
            .toArray()
            .then((contemporary) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(contemporary[0])
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

const getGenre = async (req, res) => {
    try {
        mongodb
            .getDatabase()
            .db()
            .collection('contemporary')
            .find({genre: req.params.genre})
            .toArray()
            .then((contemporary) => {
                if (contemporary.length === 0) {
                    throw new Error('No song found with the given genre.');
                  }
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(contemporary)
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
        const contemporaryData = {
            title: req.body.title,
            album: req.body.album,
            band: req.body.band,
            date: req.body.date,
            genre: req.body.genre,
            link: req.body. link,
            comment: req.body.comment
        };
        const result = await mongodb.getDatabase().db().collection('contemporary').insertOne(contemporaryData);
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
            throw new Error("Must enter a valid ID to update contemporary music.");
        }

        const contemporaryExist = await mongodb.getDatabase().db().collection('contemporary').findOne({ _id: new ObjectId(req.params.id) });
            if(!contemporaryExist) {
                throw new Error("Must enter an existing ID to find contemporary music.");
            }
        
        try {
            const contemporaryId = new ObjectId(req.params.id);
            const contemporaryData = {
                title: req.body.title,
                album: req.body.album,
                band: req.body.band,
                date: req.body.date,
                genre: req.body.genre,
                link: req.body. link,
                comment: req.body.comment
            };
            const result = await mongodb.getDatabase().db().collection('contemporary').replaceOne({_id: contemporaryId}, contemporaryData);
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

        const contemporaryExist = await mongodb.getDatabase().db().collection('contemporary').findOne({ _id: new ObjectId(req.params.id) });
        if(!contemporaryExist) {
            throw new Error("Must enter an existing ID to delete an entry.");
        }

        try {
            const contemporaryId = new ObjectId(req.params.id);
            const result = await mongodb.getDatabase().db().collection('contemporary').deleteOne({_id: contemporaryId});
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
    getGenre,
    createOne,
    updateOne,
    eraseOne
}