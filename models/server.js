const express = require("express");
const cors = require("cors");

const mongoDbConnection = require("../database/connection");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.paths = {
      auth: "/auth",
      users: "/users",
    };

    this.database();
    this.middlewares();
  }

  async database() {
    await mongoDbConnection();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
