const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const userInfoRouter = require('./userInfo.js')
const printerRouter = require('./printers.js')


router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/printers', printerRouter);
router.use('/userInfo', userInfoRouter);


module.exports = router;
