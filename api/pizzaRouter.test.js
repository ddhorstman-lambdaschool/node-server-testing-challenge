const request = require("supertest");
const router = require("./pizzaRouter");

describe("pizzaRouter", () => {
  describe("GET /", () => {
    it("does a thing", () => {
      expect(true).toBe(true);
    });
  });
});
