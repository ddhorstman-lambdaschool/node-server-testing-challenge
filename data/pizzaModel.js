const knex = require("./dbConfig");

function getPizzas() {
  return knex("pizzas");
}
function getPizza(search) {
  return knex("pizzas").where(search).first();
}

function addPizza(pizza) {
  return knex("pizzas")
    .insert(pizza, ["id"])
    .then(([id]) => getPizza({ id }));
}

function deletePizza(search) {
  return knex("pizzas").where(search).delete();
}

module.exports = { getPizzas, getPizza, addPizza, deletePizza };
