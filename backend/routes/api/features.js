const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { Printer } = require('../../db/models');
const { PrinterFeature } = require('../../db/models/');
const { handleValidationErrors } = require('../../utils/validation');
const PrintersRepository = require('../../db/printers-repository');
const ReviewsRepository = require('../../db/reviews-repository');
const router = express.Router();

router.get('/',
    asyncHandler(async (req, res) => {
        const features = await PrinterFeature.findAll();
        res.json(features)
    }));

module.exports = router;
