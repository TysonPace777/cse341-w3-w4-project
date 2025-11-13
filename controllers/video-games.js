const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Gets all videogames
const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('videoGames').find();
    result.toArray().then((videoGames) => {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(videoGames);
    });
};

// Adds a new videogame to the DB
const createGame = async (req, res) => {
    const contact = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    };
    const response = await mongodb.getDatabase().db().collection('videoGames').insertOne(contact);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occured while updating the user.')
    }
};

module.exports = {
    getAll,
    createGame
};