const express = require('express')
const asyncHandler = require('express-async-handler');
const { PrinterFeature } = require('../../db/models/');
const router = express.Router();

router.get('/',
    asyncHandler(async (req, res) => {
        const features = await PrinterFeature.findAll();
        res.json(features)
    }));

module.exports = router;
