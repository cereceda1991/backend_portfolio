import jwt from 'jsonwebtoken';
import ErrorApp from '../utils/ErrorApp';
import { tryCatch } from '../utils/tryCatch';

export const checkAuthentication = tryCatch((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(ErrorApp('Acceso no autorizado. Token no proporcionado', 401));
  }

  const token = authHeader.split(' ')[1]; // Obtén el token sin el prefijo "Bearer"

  const secretKey = process.env.SECRET_KEY;

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return next(ErrorApp('Acceso no autorizado. Token inválido', 401));
    }

    req.client = decoded;

    next();
  });
});
