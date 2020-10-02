const express = require("express");
const accounts = require("./accountsRouter");
const northWind = require("./northWindRouter");

const server = express();

server.use(express.json());
server.use("/api/accounts", accounts);
server.use("/api/northwind", northWind);
module.exports = server;
