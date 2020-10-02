const express = require("express");
const accounts = require("./accountsRouter");

const server = express();

server.use(express.json());
server.use("/api/accounts", accounts);
module.exports = server;
