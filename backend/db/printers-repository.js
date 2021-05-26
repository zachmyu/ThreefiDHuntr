const { Printer } = require("./models");

async function update(comments) {
  const id = comments.id;
  delete comments.id;
  await Printer.update(
    comments,
    {
      where: { id },
      returning: true,
      plain: true,
    }
  );
  return id;
}

async function list() {
  return await Printer.findAll();
}

async function one(id) {
  return await Printer.scope("detailed").findByPk(id);
}

module.exports = {
  update,
  list,
  one,
};
