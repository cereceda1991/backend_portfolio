import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line no-unused-vars
export const globalError = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    // En entorno de desarrollo, proporciona información detallada del error.
    return res.status(error.statusCode).json({
      status: error.status,
      errors: {
        message: error.message,
      },

      error: error,
      stack: error.stack,
    });
  } else {
    // En otros entornos, proporciona solo el estado y el mensaje.
    return res.status(error.statusCode).json({
      status: error.status,
      errors: {
        message: error.message,
      },
    });
  }
};
