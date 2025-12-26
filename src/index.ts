import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import path from 'path';
import { config } from './config/environment';
import { connectDatabase } from './config/database';
import { setupSwagger } from './swagger';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';

const app: Application = express();

const allowedOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:5173')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.listen('http://localhost:5173', function () {
  console.log('CORS-enabled web server listening on port 5173')
})

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Swagger
// setupSwagger(app);

// Serve static files from frontend dist
const distPath = path.join(__dirname, '../dist/public');
app.use(express.static(distPath));



// Error handler (must be last)
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectDatabase();
    
    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
      console.log(`API available at http://localhost:${config.port}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();