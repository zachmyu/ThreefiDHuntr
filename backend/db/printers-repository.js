const { Printer } = require("./models");

async function update(printer) {
  const id = printer.id;
  delete printer.id;
  await Printer.update(
    printer,
    {
      where: { id },
      returning: true,
      plain: true,
    }
  );
  return await Printer.findByPk(id);
}

async function list() {
  return await Printer.findAll();
}

async function one(id) {
  return await Printer.scope("detailed").findByPk(id);
}

async function deletePrinter(printerId) {
  const printer = await Printer.findByPk(printerId);
  if (!printer) throw new Error('Cannot find printer');

  await Printer.destroy({ where: { id: printer.id } });
  return printer.id;
}

module.exports = {
  update,
  list,
  one,
  deletePrinter,
};
