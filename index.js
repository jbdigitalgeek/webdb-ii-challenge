const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const server = express();

server.use(express.json());
server.use(helmet());

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.db3',
    },
    useNullAsDefault: true,
};




const db = knex(knexConfig);


// endpoints here
server.get('/', (req, res) => {
  db('zoos')
    .then(zoo => {
      res.status(200).json(zoo);
    })
    .catch(error => {
    res.status(500).json({ message: `${error}`})
  })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
