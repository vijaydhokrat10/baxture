// multi.js
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const { app, PORT } = require('./app');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });
} else {
  console.log(`Worker ${process.pid} started`);

  // Calculate the port for the worker
  
  const workerPort = parseInt(PORT,10) + cluster.worker.id;

  // Your application logic here

  app.listen(workerPort, () => {
    console.log(`Server is running on port ${workerPort} in worker ${process.pid}`);
  });
}
