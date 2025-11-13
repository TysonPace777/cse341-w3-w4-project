const express = require('express');
const router = express.Router();
const utilities = require('../utilities/index');
const validate = require('../utilities/video-games');

const videoGamesController = require("../controllers/video-games");

router.get('/', utilities.handleErrors(videoGamesController.getAll));
router.get('/:id', utilities.handleErrors(videoGamesController.getSingle));

router.post('/', validate.checkCreateGame, utilities.handleErrors(videoGamesController.createGame));

router.put('/:id', validate.checkCreateGame, utilities.handleErrors(videoGamesController.updateGame));

router.delete('/:id', utilities.handleErrors(videoGamesController.deleteGame));

module.exports = router;