const router = require("express").Router();
const Pizzas = require("../data/pizzaModel");
const { catchAsync } = require("./errors");

router.get(
  "/",
  catchAsync(async (req, res) => {
    res.status(200).json(await Pizzas.getPizzas());
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const pizza = await Pizzas.getPizza({ id });
    !pizza
      ? res.status(404).json({ message: `No pizza found with id '${id}'.` })
      : res.status(200).json(pizza);
  })
);

router.post(
  "/",
  catchAsync(async (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ message: `Please specify a name for your pizza` });
    }
    const newPizza = await Pizzas.addPizza({ name });
    res.status(201).json(newPizza);
  })
);

router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const count = await Pizzas.deletePizza({ id });
    count == 0
      ? res.status(404).json({ message:`Unable to delete a pizza with id '${id}'.` })
      : res.status(204).end();
  })
);

module.exports = router;
