const express = require('express');
const server = express();
const helmet = require("helmet");
//const cors = require("cors");
//require("dotenv").config();

server.use(helmet());
server.use(express.json());
//server.use(cors());

const pizzaRouter = require("./pizzaRouter");
server.use("/api/pizzas",pizzaRouter);

const { custom404, errorHandling } = require("./errors");
server.all("*", custom404);
server.use(errorHandling);

module.exports = server;