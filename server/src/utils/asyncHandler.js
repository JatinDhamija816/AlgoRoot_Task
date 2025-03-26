import { v4 as uuidv4 } from 'uuid';

/**
 * Wraps an asynchronous Express route handler to automatically catch errors and pass them to the next middleware.
 * @param {Function} fn - The asynchronous route handler function.
 * @returns {Function} - A wrapped route handler that catches errors and passes them to the next middleware.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    const errorId = uuidv4(); // Unique ID for better tracking

    if (process.env.NODE_ENV === 'development') {
      const logError = {
        errorId,
        message: error.message || 'Unknown error occurred',
        stack: error.stack || 'No stack trace available',
        request: {
          method: req.method,
          url: req.originalUrl,
          ...(Object.keys(req.params).length > 0 && { params: req.params }),
          ...(Object.keys(req.query).length > 0 && { query: req.query }),
          ...(process.env.LOG_REQUEST_BODY === 'true' && getSafeBody(req.body)),
        },
      };

      console.error(
        '🚨 AsyncHandler Error:',
        JSON.stringify(logError, null, 2)
      );
    }

    error.errorId = errorId; // Attach ID to error for API responses
    next(error);
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

export default asyncHandler;
