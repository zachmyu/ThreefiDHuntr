const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
// const ReviewsRepository = require("../../db/reviews-repository");
const { Review, User, Printer } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please input your review for the printer.'),
    handleValidationErrors,
];

//Add review
// router.post('/:id', validateReview, asyncHandler(async (req, res) => {
//     const { reviews, printerId, userId } = req.body;
//     const newReview = await Review.create({
//         ...reviews,
//         printerId,
//         userId
//     })
// 	return res.json({ newReview });
// }));

//Get One Review
router.get('/:id', asyncHandler(async function (req, res) {
    const review = await Review.findByPk(req.params.id, {
        include: Printer,
        include: User
    });
    return res.json(review)
}))

//Update review
router.put('/:id', validateReview, asyncHandler(async function (req, res) {

    // const reviewId = review.id;
    // delete review.id
    // await Review.update(
    //     review,
    //     {
    //         where: { reviewId },
    //         returning: true,
    //         plain: true,
    //     }
    // )
    // const deletedId = await Review.findByPk(id);

    // return res.json(deletedId);
    const { userId, printerId, review } = req.body;

    const updatedReview = await PrinterReview.update({
        userId, printerId, review
    })
    return res.json(updatedReview);
}));

//Delete review
router.delete("/:id", asyncHandler(async function (req, res) {
    const reviewToDel = await Review.findByPk(req.params.id)
    if (!reviewToDel) throw new Error('Cannot find review');
    await Review.destroy({ where: { id: reviewToDel } });
    return res.json({ reviewToDel });
}));

module.exports = router;
