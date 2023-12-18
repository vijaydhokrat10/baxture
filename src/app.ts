// app.ts
import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/usersRoutes';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', usersRoutes);

// Handle non-existing endpoints
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Handle server errors
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

if (!process.env.npm_lifecycle_event || process.env.npm_lifecycle_event !== 'start:multi') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export { app, PORT };
