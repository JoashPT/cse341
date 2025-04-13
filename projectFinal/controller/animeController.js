const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    mongodb
        .getDatabase()
        .db()
        .collection('anime')
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
            throw new Error('Must enter a valid ID to find anime music.');
        }
        
        const animeId = new ObjectId(req.params.id);
        const animeExist = await mongodb.getDatabase().db().collection('anime').findOne({ _id: new ObjectId(req.params.id) });
                if(!animeExist) {
                    throw new Error("Must enter an existing ID to find anime music.");
                }

        mongodb
            .getDatabase()
            .db()
            .collection('anime')
            .find({_id: animeId})
            .toArray()
            .then((anime) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(anime[0])
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

const getAnime = async (req, res) => {
    try {
        mongodb
            .getDatabase()
            .db()
            .collection('anime')
            .find({anime: req.params.anime})
            .toArray()
            .then((anime) => {
                if (anime.length === 0) {
                    throw new Error('No song found with the given genre.');
                  }
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(anime)
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

const getBand = async (req, res) => {
    try {
        mongodb
            .getDatabase()
            .db()
            .collection('anime')
            .find({band: req.params.band})
            .toArray()
            .then((band) => {
                if (band.length === 0) {
                    throw new Error('No song found with the given genre.');
                  }
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(band)
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
        const animeData = {
            title: req.body.title,
            anime: req.body.anime,
            band: req.body.band,
            soundtrack: req.body.soundtrack,
            date: req.body.date,
            link: req.body.link,
            comment: req.body.comment
        };
        const result = await mongodb.getDatabase().db().collection('anime').insertOne(animeData);
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
            throw new Error("Must enter a valid ID to update anime music.");
        }

        const animeExist = await mongodb.getDatabase().db().collection('anime').findOne({ _id: new ObjectId(req.params.id) });
            if(!animeExist) {
                throw new Error("Must enter an existing ID to update anime music.");
            }
        
        try {
            const animeId = new ObjectId(req.params.id);
            const animeData = {
                title: req.body.title,
                anime: req.body.anime,
                band: req.body.band,
                soundtrack: req.body.soundtrack,
                date: req.body.date,
                link: req.body.link,
                comment: req.body.comment
            };
            const result = await mongodb.getDatabase().db().collection('anime').replaceOne({_id: animeId}, animeData);
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

        const animeExist = await mongodb.getDatabase().db().collection('anime').findOne({ _id: new ObjectId(req.params.id) });
        if(!animeExist) {
            throw new Error("Must enter an existing ID to delete an entry.");
        }

        try {
            const animeId = new ObjectId(req.params.id);
            const result = await mongodb.getDatabase().db().collection('anime').deleteOne({_id: animeId});
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
    getAnime,
    getBand,
    createOne,
    updateOne,
    eraseOne
}