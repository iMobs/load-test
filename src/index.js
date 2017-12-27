require('dotenv').config();

const cluster = require('cluster');

if (cluster.isMaster) {
  const numCPUs = require('os').cpus().length;

  const db = require('./db');

  db.knex.migrate.latest()
    .then(() => {
      console.log('Database ready');

      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
    });

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.id} has died :(`);

    cluster.fork();
  });
} else {
  const app = require('./app');
  const PORT = process.env.PORT || 8080;
  
  app.listen(PORT, (error) => {
    if (error) {
    } else {
      console.log(`worker ${cluster.worker.id} listening on port ${PORT}`);
    }
  });
}

