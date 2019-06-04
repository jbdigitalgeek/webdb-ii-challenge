const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const server = express();
const Zoos = require("./data/data-model");

server.use(express.json());
server.use(helmet());

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.db3"
  },
  useNullAsDefault: true
};

const db = knex(knexConfig);

// endpoints here
server.get("/", (req, res) => {
  Zoos.find()
    .then(zoo => {
      res.status(200).json(zoo);
    })
    .catch(error => {
      res.status(500).json({ message: `${error}` });
    });
});

server.get("/:id", (req, res) => {
  Zoos.findById(req.params.id)
    .then(animal => {
      if (animal) {
        res.status(200).json(animal);
      } else {
        res.status(404).json({ message: "Animal not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: `${error}` });
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
