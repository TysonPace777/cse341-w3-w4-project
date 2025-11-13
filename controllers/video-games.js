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

//gets one videogame
const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Must use a valid video game ID.' });
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('videoGames').find({ _id: userId });
    result.toArray().then((videoGames) => {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(videoGames[0]);
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
        res.status(500).json(response.error || 'An error occured while creating the game.')
    }
};

// update game info
const updateGame = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Must use a valid video game ID.' });
    }
    const userId = new ObjectId(req.params.id);
    const contact = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    };
    const response = await mongodb.getDatabase().db().collection('videoGames').replaceOne({ _id: userId }, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occured while updating the game.')
    }
};

// delete game
const deleteGame = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Must use a valid video game ID.' });
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('videoGames').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occured while deleting the game.')
    }
};

module.exports = {
    getAll,
    getSingle,
    createGame,
    updateGame,
    deleteGame
};