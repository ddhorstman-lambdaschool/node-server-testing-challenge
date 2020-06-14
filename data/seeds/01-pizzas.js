exports.seed = function (knex) {
  return knex("pizzas").insert([
    { name: "Pepperoni" },
    { name: "Meat Lover's" },
    { name: "Hawaiian" },
  ]);
};
