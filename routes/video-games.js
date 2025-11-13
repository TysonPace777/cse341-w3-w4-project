const express = require('express');
const router = express.Router();

const videoGamesController = require("../controllers/video-games");

router.get('/', videoGamesController.getAll);

router.post('/', videoGamesController.createGame);

module.exports = router;