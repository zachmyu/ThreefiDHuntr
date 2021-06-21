const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const printersRouter = require('./printers.js')
const reviewsRouter = require('./reviews.js')
const featuresRouter = require('./features')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/printers', printersRouter);
router.use('/reviews', reviewsRouter);
router.use('/features', featuresRouter)

module.exports = router;
