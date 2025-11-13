const router = require('express').Router();

router.get('/', (req, res) => (res.send("Hello World")));

router.use('/', require('./swagger'));
router.use('/games', require('./video-games'));


module.exports = router;