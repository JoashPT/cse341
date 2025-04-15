const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    try {
        const db = await mongodb.dbase();
        const list = await db.collection('classical').find().toArray()
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    } catch (err) {
        if (err) {
            res.status(400).json({message: err});
        }  
    }
}

const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw new Error('Must enter a valid ID to find classical piece.');
        }
        
        const classicalId = new ObjectId(req.params.id);
        const classicalExist = await mongodb.getDatabase().db().collection('classical').findOne({ _id: new ObjectId(req.params.id) });
                if(!classicalExist) {
                    throw new Error("Must enter an existing ID to find classical piece.");
                }

        mongodb
            .getDatabase()
            .db()
            .collection('classical')
            .find({_id: classicalId})
            .toArray()
            .then((classical) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(classical[0])
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

const getPeriod = async (req, res) => {
    try {
        mongodb
            .getDatabase()
            .db()
            .collection('classical')
            .find({period: req.params.period})
            .toArray()
            .then((classical) => {
                if (classical.length === 0) {
                    throw new Error('No piece found with the given period.');
                  }
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(classical)
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
        const classicalData = {
            form: req.body.form,
            opus: req.body.opus,
            number: req.body.number,
            key: req.body.key,
            composer: req.body.composer,
            period: req.body.period,
            link: req.body.link,
            comment: req.body.comment
        };
        const result = await mongodb.getDatabase().db().collection('classical').insertOne(classicalData);
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
            throw new Error("Must enter a valid ID to update a classical piece.");
        }

        const classicalExist = await mongodb.getDatabase().db().collection('classical').findOne({ _id: new ObjectId(req.params.id) });
            if(!classicalExist) {
                throw new Error("Must enter an existing ID to find a classical piece.");
            }
        
        try {
            const classicalId = new ObjectId(req.params.id);
            const classicalData = {
                form: req.body.form,
                opus: req.body.opus,
                number: req.body.number,
                key: req.body.key,
                composer: req.body.composer,
                period: req.body.period,
                link: req.body.link,
                comment: req.body.comment
            };
            const result = await mongodb.getDatabase().db().collection('classical').replaceOne({_id: classicalId}, classicalData);
            if (result.modifiedCount > 0) {
                res.status(204).send();
            }
        } catch (error) {
            res.status(500).json(error || "An error occurred while updating a classical.");
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const eraseOne = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw new Error("Must enter a valid ID to delete a classical music entry.");
        }

        const classicalExist = await mongodb.getDatabase().db().collection('classical').findOne({ _id: new ObjectId(req.params.id) });
        if(!classicalExist) {
            throw new Error("Must enter an existing ID to delete a classical music.");
        }

        try {
            const classicalId = new ObjectId(req.params.id);
            const result = await mongodb.getDatabase().db().collection('classical').deleteOne({_id: classicalId});
            if (result.deletedCount > 0) {
                res.status(204).send();
            }
        } catch (error) {
            res.status(500).json(result.error || "An error occurred while deleting a classical piece.");
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getAll,
    getSingle,
    getPeriod,
    createOne,
    updateOne,
    eraseOne
}