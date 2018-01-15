/* eslint-disable no-console */
require('dotenv').config();

const cluster = require('cluster');

const numCPUs = require('os').cpus().length;

const app = require('./app');

const PORT = process.env.PORT || 8080;

if (cluster.isMaster) {
  console.log(process.env.foo);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.id} has died :(`);

    cluster.fork();
  });
} else {
  app.listen(PORT, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`worker ${cluster.worker.id} listening on port ${PORT}`);
    }
  });
}

