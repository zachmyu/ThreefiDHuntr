const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { User, Printer, PrinterReview, FeatureType, PrinterBoost, PrinterTag, OwnedPrinter } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateAdd = [
	check('brand')
		.exists({ checkFalsy: true })
		.isLength({ min: 2 })
		.withMessage('Please list a brand with at least 2 characters.'),
	check('model')
		.exists({ checkFalsy: true })
		.isLength({ min: 2 })
		.withMessage('Please list a model with at least 2 characters.'),
	check('description')
		.exists({ checkFalsy: true })
		.isLength({ min: 2 })
		.withMessage('Please add a description for the printer.'),
	check('retailPrice')
		.exists({ checkFalsy: true })
		.isLength({ min: 2 })
		.withMessage('If unsure of price, please put an estimate.'),
	check('videoUrl')
		.isURL()
		.withMessage('Please enter a valid URL.'),
	check('pictureUrl')
		.isURL()
		.withMessage('Please enter a valid URL.'),
	handleValidationErrors,
];

const validateUpdate = [
	check('description')
		.exists({ checkFalsy: true })
		.isLength({ min: 2 })
		.withMessage('Please add a description for the printer.'),
	check('retailPrice')
		.exists({ checkFalsy: true })
		.isLength({ min: 2 })
		.withMessage('If unsure of price, please put an estimate.'),
	check('videoUrl')
		.isURL()
		.withMessage('Please enter a valid URL.'),
	check('pictureUrl')
		.isURL()
		.withMessage('Please enter a valid URL.'),
	handleValidationErrors,
];

const validateReview = [
	check('review')
		.exists({ checkFalsy: true })
		.isLength({ min: 2 })
		.withMessage('Please input your review for the printer.'),
	handleValidationErrors,
];

//Load list of printers
router.get('/', asyncHandler(async function (req, res) {
	const printers = await Printer.findAll({
        include: "Boost"
    });
	return res.json(printers);
}));

//Load single printer
router.get('/:id', asyncHandler(async function (req, res) {
	const printer = await Printer.findByPk(req.params.id, {
        include: PrinterReview,
    });
    return res.json(printer);
}));

//Add printer review
router.post('/:id/reviews', validateReview, asyncHandler(async function (req, res) {
    const {userId, printerId, review} = req.body;

    await PrinterReview.create({
        userId, printerId, review
    })

    const reviews = await PrinterReview.findAll({
        where: {printerId},
        include: User
    })

    return res.json(reviews)
}))

//Load printer reviews
router.get('/:id/reviews', asyncHandler(async function (req, res) {
	const reviews = await Review.findAll({ where: { id: req.params.id },
    include: User });
	return res.json(reviews);
}));

//Add new printer
router.post('/', validateAdd, asyncHandler(async (req, res) => {
	const {
        brand,
        model,
        description,
        retailPrice,
        videoUrl,
        pictureUrl,
        retailStatus,
        features
    } = req.body;
	const printer = await Printer.create({
        brand,
        model,
        description,
        retailPrice,
        videoUrl,
        pictureUrl,
        retailStatus
    });
    const newFeatures = features.map(featureId => {
        return {featureId: parseInt(featureId), printerId: printer.id}
    })
    await FeatureType.bulkCreate(newFeatures)
	return res.json({ printer });
}));

//Edit printer info
router.put('/:id', validateUpdate, asyncHandler(async function (req, res) {
    await Printer.update(req.body, { where: { id: req.params.id } })
    const printer = await Printer.findByPk(req.params.id)
	return res.json(printer)
}));

//Delete printer
router.delete("/:id", asyncHandler(async function (req, res) {
    const printerToDel = await Printer.findByPk(req.params.id)
    if (!printerToDel) throw new Error('Printer not found!');
    await FeatureType.destroy({where: {printerId: printerToDel.id}})
    await PrinterBoost.destroy({where: {printerId: printerToDel.id}})
    await PrinterTag.destroy({where: {printerId: printerToDel.id}})
    await OwnedPrinter.destroy({where: {printerId: printerToDel.id}})
    await PrinterReview.destroy({where: {printerId: printerToDel.id}})
    await Printer.destroy({ where: {id: printerToDel.id} });
    return res.json({ printerToDel });
}));

module.exports = router;
