const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { setTokenCookie } = require('../../utils/auth');
const { User, PrinterBoost, PrinterTag, OwnedPrinter,PrinterReview } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
// const ReviewsRepository = require('../../db/reviews-repository');
const router = express.Router();

const validateSignup = [
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('fullName')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please add a name with at least 2 characters.'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

const validateUpdate = [
    check('fullName')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please add a name with at least 2 characters.'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

//Load list of users
router.get('/', asyncHandler(async function (_req, res) {
    const users = await User.findAll();
    return res.json(users);
}));

//load single user
router.get('/:id', asyncHandler(async function (req, res) {
    const user = await User.findByPk(req.params.id, {
        include: {
            model: PrinterBoost,
            model: PrinterTag,
            model: OwnedPrinter,
            model: PrinterReview
        }});
    return res.json(user);
}));

//load user's reviews
router.get('/:id/reviews', asyncHandler(async function (req, res) {
    const reviews = await Review.findAll({ where: { id: req.params.id } });
    return res.json(reviews);
}));

//add new user
router.post('/', validateSignup, asyncHandler(async (req, res) => {
    const { username, fullName, email, about, password } = req.body;
    const user = await User.signup({ username, fullName, email, about, password });

    await setTokenCookie(res, user);
    return res.json({ user });
}));

//edit user info
router.put('/:id', validateUpdate, asyncHandler(async function (req, res) {
    await User.update(req.body, { where: { id: req.params.id } });
    const user = await User.findByPk(req.params.id)
    return res.json(user);
}));

//delete user
router.delete("/:id", asyncHandler(async function (req, res) {
    const userId = await User.destroy({ where: { id: req.params.id } });
    return res.json({ userId });
}));


module.exports = router;
