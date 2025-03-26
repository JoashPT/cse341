const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('contacts')
        .find()
    result.toArray((err) => {
            if (err) {
                res.status(400).json({message: err});
            }
           
        }).then((contact) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contact);
        });
}

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must enter a valid ID to get contact.');
    }
    const contactId = new ObjectId(req.params.id);
    mongodb
        .getDatabase()
        .db()
        .collection('contacts')
        .find({_id: contactId})
        .toArray((err) => {
            if (err) {
                res.status(400).json({message: err});
            }
            })
        .then((contact) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contact[0]);
        });
}

const createContact = async (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthDay: req.body.birthDay
    };
    const result = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'An error occurred while creating a contact');
    }
}

const updateContact = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must enter a valid ID to update contact.');
    }
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthDay: req.body.birthDay
    };
    const result = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: contactId}, contact)
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'An error occurred while updating a contact');
    }
}

const deleteContact = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must enter a valid ID to delete contact.');
    }
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: contactId});
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'An error occurred while deleting a contact');
    }
}

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
}