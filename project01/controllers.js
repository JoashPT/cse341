const mongodb = require('./database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contact) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact);
    })
}

const getSingle = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({_id: contactId});
    result.toArray().then((contact) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact[0]);
    })
}

module.exports = {
    getAll,
    getSingle
}