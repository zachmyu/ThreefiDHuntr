const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const ReviewsRepository = require("../../db/reviews-repository");
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateUpdate = [
    check('review')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please input your review for the printer.'),
    handleValidationErrors,
];

router.put('/:id', validateUpdate, asyncHandler(async function (req, res) {
    const review = await ReviewsRepository.updateReview(req.body);

    return res.json(review);
}));

router.delete("/:id", asyncHandler(async function (req, res) {
    const reviewId = await ReviewsRepository.deleteReview(req.params.id);

    return res.json({ reviewId });
}));

module.exports = router;
