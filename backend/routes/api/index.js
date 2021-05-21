const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');

router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
