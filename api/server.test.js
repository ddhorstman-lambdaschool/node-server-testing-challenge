const request = require("supertest");
const server = require("./server");
const knex = require("../data/dbConfig");

describe("pizzaRouter", () => {
  const bU = "/api/pizzas";
  beforeEach(async () => {
    await knex("pizzas").truncate();
    await knex("pizzas").insert([
      { name: "Grandma pizza" },
      { name: "Hawaiian pizza" },
    ]);
  });

  describe("GET /", () => {
    let res;
    beforeAll(async () => {
      res = await request(server).get(`${bU}/`);
    });

    it("Returns status 200", () => {
      expect(res.status).toBe(200);
    });
    it("Returns an array of pizzas", () => {
      expect(Array.isArray(res.body));
      expect(res.body.length).toBe(2);
    });
  });

  describe("GET /:id", () => {
    it("Returns a pizza object given a valid ID", async () => {
      const res = await request(server).get(`${bU}/1`);
      expect(res.status).toBe(200);
      expect(res.body.name).toBeDefined();
    });
    it("Returns a 404 for an invalid ID", async () => {
      const res = await request(server).get(`${bU}/99`);
      expect(res.status).toBe(404);
      expect(res.body.message).toContain("99");
    });
  });

  describe("POST /", () => {
    let res;
    beforeAll(async () => {
      res = await request(server).post(`${bU}/`).send({ name: "Aglio E Olio" });
    });
    it("Returns status 201", () => {
      expect(res.status).toBe(201);
    });
    it("Returns the newly-created pizza", () => {
      expect(res.body.name).toBe("Aglio E Olio");
    });
    it("Returns an error for invalid requests", async () => {
      const resInvalid = await request(server)
        .post(`${bU}/`)
        .send({ invalidProp: "Invalid value" });
      expect(resInvalid.status).toBe(400);
      expect(resInvalid.body.message).toContain("name");
    });
  });

  describe("DELETE /", () => {
    it("Deletes an existing pizza", async () => {
      const res = await request(server).delete(`${bU}/1`);
      expect(res.status).toBe(204);
      expect(res.body).toEqual({});
    });
    it("Sends an error when trying to delete an invalid pizza", async () => {
      const res = await request(server).delete(`${bU}/99`);
      expect(res.status).toBe(404);
      expect(res.body.message).toContain("99");
    });
  });
});
