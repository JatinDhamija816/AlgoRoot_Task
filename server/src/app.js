import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import taskRoutes from './routes/task.routes.js';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

const allowedOrigins = isProduction
  ? [process.env.FRONTEND_URL]
  : ['http://localhost:5173'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.warn(`❌ CORS blocked request from: ${origin}`);
      return callback(new Error('CORS Policy Violation'), false);
    },
    credentials: true,
  })
);

// Security: Cookie settings
app.use(cookieParser());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Routes
app.use('/api/v1', taskRoutes);

// Handle undefined routes (404)
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Centralized error handling
app.use(errorHandler);

export default app;
