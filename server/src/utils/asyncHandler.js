import { v4 as uuidv4 } from 'uuid';

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    const errorId = uuidv4();

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

    error.errorId = errorId;
    next(error);
  });
};

const getSafeBody = (body) => {
  if (!body || Object.keys(body).length === 0) return undefined;
  try {
    return {
      body: JSON.stringify(body, null, 2).slice(0, 500) + '...',
    };
  } catch (err) {
    return { body: '[Unstringifiable body]' };
  }
};

export default asyncHandler;
