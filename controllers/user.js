const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
import bcrypt from 'bcrypt';

//hash passwords
async function hashPassword(password) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
}

//gets one user
const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Must use a valid user ID.' });
        }
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
        result.toArray().then((users) => {
            res.setHeader('Content-type', 'application/json');
            res.status(200).json(users[0]);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Adds a new user to the DB
const createUser = async (req, res) => {
    try {
        const hashedPassword = await hashPassword(req.body.password);

        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            birthday: req.body.birthday,
            password: hashedPassword,
            membershipLevel: req.body.membershipLevel
        };
        const response = await mongodb.getDatabase().db().collection('users').insertOne(contact);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'An error occured while creating the user.')
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// update user info
const updateUser = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Must use a valid user ID.' });
        }
        const userId = new ObjectId(req.params.id);
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            birthday: req.body.birthday,
            password: req.body.password,
            membershipLevel: req.body.membershipLevel
        };
        const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, contact);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'An error occured while updating the user.')
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// delete user
const deleteUser = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Must use a valid user ID.' });
        }
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'An error occured while deleting the user.')
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getSingle,
    createUser,
    updateUser,
    deleteUser
};