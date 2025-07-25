import config from '../config/index.js';

// This middleware must have 4 arguments to be recognized as an error handler.
export function errorHandler(err, req, res, next) {
    console.error(err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        error: 'An unexpected error occurred on the server.',
        // Only include detailed message in development for debugging
        ...(config.nodeEnv === 'development' && { details: err.message }),
    });
}