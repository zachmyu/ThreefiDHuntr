const { Review } = require("./models");

async function reviewsByPrinterId(printerId) {
  return await Review.findAll({
    where: {
      printerId,
    },
  });
}

async function reviewsByUserId(userId) {
  return await Review.findAll({
    where: {
      userId,
    },
  });
}

async function addReview(reviews, printerId, userId) {
  const review = await Review.create({
    ...reviews,
    printerId,
    userId
  });
  return await Review.findByPk(review.id);
}

async function deleteReview(reviewId) {
  const review = await Review.findByPk(reviewId);
  if (!review) throw new Error('Cannot find review');

  await Review.destroy({ where: { id: review.id } });
  return review.id;
}

async function updateReview(review) {
  const id = review.id;
  delete review.id;
  // console.log({ review, id });
  await Review.update(
    review,
    {
      where: { id },
      returning: true,
      plain: true,
    }
  );
  return await Review.findByPk(id);
}

module.exports = {
  reviewsByPrinterId,
  reviewsByUserId,
  addReview,
  deleteReview,
  updateReview,
};
