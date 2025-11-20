const express = require('express');
const router = express.Router();
const utilities = require('../utilities/index');
const validate = require('../utilities/video-games');
const { isAuthenticated } = require("../middleware/authenticate");

const videoGamesController = require("../controllers/video-games");

router.get('/', utilities.handleErrors(videoGamesController.getAll));
router.get('/:id', utilities.handleErrors(videoGamesController.getSingle));

router.post('/', isAuthenticated, validate.checkCreateGame, utilities.handleErrors(videoGamesController.createGame));

router.put('/:id', isAuthenticated, validate.checkCreateGame, utilities.handleErrors(videoGamesController.updateGame));

router.delete('/:id', isAuthenticated, utilities.handleErrors(videoGamesController.deleteGame));

module.exports = router;