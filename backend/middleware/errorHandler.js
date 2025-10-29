export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let error = {
    success: false,
    message: 'Internal Server Error',
    statusCode: 500
  };

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = {
      success: false,
      message: `Validation Error: ${message}`,
      statusCode: 400
    };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = {
      success: false,
      message: 'Invalid token',
      statusCode: 401
    };
  }

  if (err.name === 'TokenExpiredError') {
    error = {
      success: false,
      message: 'Token expired',
      statusCode: 401
    };
  }

  // PostgreSQL errors
  if (err.code === '23505') { // Unique violation
    error = {
      success: false,
      message: 'Duplicate entry. This record already exists.',
      statusCode: 409
    };
  }

  if (err.code === '23503') { // Foreign key violation
    error = {
      success: false,
      message: 'Referenced record not found.',
      statusCode: 400
    };
  }

  if (err.code === '23502') { // Not null violation
    error = {
      success: false,
      message: 'Required field is missing.',
      statusCode: 400
    };
  }

  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    error = {
      success: false,
      message: 'File too large',
      statusCode: 400
    };
  }

  if (err.code === 'LIMIT_FILE_COUNT') {
    error = {
      success: false,
      message: 'Too many files',
      statusCode: 400
    };
  }

  // Custom error with status code
  if (err.statusCode) {
    error.statusCode = err.statusCode;
    error.message = err.message;
  }

  // Development vs production error details
  const response = {
    success: error.success,
    message: error.message
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
    response.error = err;
  }

  res.status(error.statusCode).json(response);
};
