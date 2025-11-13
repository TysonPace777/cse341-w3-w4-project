const express = require('express');
const router = express.Router();
const utilities = require('../utilities/index');
const validate = require('../utilities/user');

const userController = require('../controllers/user');

router.get('/:id', utilities.handleErrors(userController.getSingle));

router.post('/', validate.checkCreateUser, utilities.handleErrors(userController.createUser));

router.put('/:id', validate.checkCreateUser, utilities.handleErrors(userController.updateUser));

router.delete('/:id', utilities.handleErrors(userController.deleteUser));

module.exports = router;