const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const ReviewsRepository = require("../../db/reviews-repository");

const router = express.Router();

router.put(
  "/:id",
  itemValidations.validateUpdate,
  asyncHandler(async function (req, res) {
    const item = await ItemsRepository.updateItem(req.body);
    return res.json(item);
  })
);

router.delete("/:id", asyncHandler(async function (req, res) {
  const itemId = await ItemsRepository.deleteItem(req.params.id);
  return res.json({ itemId });
}));

module.exports = router;
