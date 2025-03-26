import { v4 as uuidv4 } from 'uuid';
import ApiError from '../utils/ApiError.js';

/**
 * Centralized Express error handler middleware.
 *
 * @param {Error} err - The error object thrown in the application.
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Express next function.
 */
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err); // Prevent multiple responses

  const errorId = err.errorId || uuidv4(); // Ensure every error has a unique ID
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message =
    err instanceof ApiError ? err.message : 'Internal Server Error';
  const errors =
    err instanceof ApiError && Array.isArray(err.errors) ? err.errors : [];
  const data = err instanceof ApiError ? (err.data ?? null) : null;
  const timestamp = err.timestamp || new Date().toISOString();

  // Enhanced logging in development mode
  if (process.env.NODE_ENV === 'development') {
    console.error('🚨 [ErrorHandler]:', {
      errorId,
      message: err.message || 'Unknown error',
      stack: err.stack || 'No stack trace available',
      request: {
        method: req.method,
        url: req.originalUrl,
        ...(Object.keys(req.params).length > 0 && { params: req.params }),
        ...(Object.keys(req.query).length > 0 && { query: req.query }),
        ...(process.env.LOG_REQUEST_BODY === 'true' && getSafeBody(req.body)),
      },
    });
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    data,
    errorId,
    timestamp,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Include stack trace in dev mode
  });
};

/**
 * Safely formats the request body for logging.
 * @param {any} body - The request body.
 * @returns {object | undefined}
 */
const getSafeBody = (body) => {
  if (!body || Object.keys(body).length === 0) return undefined;
  try {
    return {
      body: JSON.stringify(body, null, 2).slice(0, 500) + '...', // Truncate long bodies
    };
  } catch (err) {
    return { body: '[Unstringifiable body]' }; // Handle circular structures or buffers
  }
};

export default errorHandler;
