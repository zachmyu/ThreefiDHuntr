const { Comment } = require("./models");

async function commentsByPrinterId(printerId) {
  return await Comment.findAll({
    where: {
      printerId,
    },
  });
}

async function addComment(comments, printerId) {
  const comment = await Comment.create({
    ...comments,
    printerId,
  });
  return await Comment.findByPk(comment.id);
}

async function deleteComment(commentId) {
  const comment = await Comment.findByPk(commentId);
  if (!comment) throw new Error('Cannot find comment');

  await Comment.destroy({ where: { id: comment.id } });
  return comment.id;
}

async function updateComment(comment) {
  const id = comment.id;
  delete comment.id;
  console.log({ comment, id });
  await Comment.update(
    comment,
    {
      where: { id },
      returning: true,
      plain: true,
    }
  );
  return await Comment.findByPk(id);
}

module.exports = {
  commentsByPrinterId,
  addComment,
  deleteComment,
  updateComment,
};
