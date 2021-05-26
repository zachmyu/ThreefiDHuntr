const { User } = require("./models");

async function update(user) {
  const id = user.id;
  delete user.id;
  await User.update(
    user,
    {
      where: { id },
      returning: true,
      plain: true,
    }
  );
  return await User.findByPk(id);
}

async function list() {
  return await User.findAll();
}

async function one(id) {
  return await User.scope("detailed").findByPk(id);
}

async function deleteUser(userId) {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('Cannot find user');

  await User.destroy({ where: { id: user.id } });
  return user.id;
}

module.exports = {
  update,
  list,
  one,
  deleteUser,
};
