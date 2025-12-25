import express, { Application } from 'express';
import { config } from './config/environment';
import { connectDatabase } from './config/database';
import { setupSwagger } from './swagger';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
setupSwagger(app as any);

// Routes
app.use('/api', routes);

// Error handler (must be last)
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectDatabase();
    
    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
      console.log(`Swagger docs available at http://localhost:${config.port}/api-docs`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();