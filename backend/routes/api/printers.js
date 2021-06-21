const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Printer } = require('../../db/models');
const { PrinterFeature } = require('../../db/models/');

const { handleValidationErrors } = require('../../utils/validation');
const PrintersRepository = require('../../db/printers-repository');
const ReviewsRepository = require('../../db/reviews-repository');
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
// router.get('/', asyncHandler(async function (_req, res) {
//   const printers = await PrintersRepository.list();
//   return res.json(printers);
// }));

router.get('/', asyncHandler(async function (req, res) {
  const printers = await Printer.findAll();
  return res.json(printers);
}));


//load single printer
router.get('/:id', asyncHandler(async function (req, res) {
  const printer = await Printer.findByPk(req.params.id);
  return res.json(printer);
}));

//load printer comments
router.get('/:id/reviews', asyncHandler(async function (req, res) {
  const reviews = await ReviewsRepository.reviewsByPrinterId(req.params.id);
  return res.json(reviews);
}));


router.get('/features', asyncHandler(async function (req, res) {

  console.log('>>>>>> here')
  const features = await PrinterFeature.findAll();

  return res.json(features);
}));

//add new printer validateAdd,
router.post('/', asyncHandler(async (req, res) => {
  const { brand, model, description, retailPrice, videoUrl, pictureUrl, retailStatus } = req.body;
  const printer = await Printer.create({ brand, model, description, retailPrice, videoUrl, pictureUrl, retailStatus });

  return res.json({ printer });
}),
);

//add new printer review
router.post('/:id', validateReview, asyncHandler(async (req, res) => {
  const review = await ReviewsRepository.addReview(req.body, req.params.id);

  return res.json({ review });
}),
);

//edit printer info
router.patch('/:id', validateUpdate, asyncHandler(async function (req, res) {
  const id = await PrintersRepository.update(req.body);
  const printer = await PrintersRepository.one(id);
  return res.json(printer);
})
);

//delete printer
router.delete("/:id", asyncHandler(async function (req, res) {
  const printerId = await PrintersRepository.deletePrinter(req.params.id);
  return res.json({ printerId });
}));

module.exports = router;
