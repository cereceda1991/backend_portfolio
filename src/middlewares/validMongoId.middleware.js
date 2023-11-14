import mongoose from 'mongoose';
import ErrorApp from '../utils/ErrorApp';

export const validMongoId = (entity) => (req, res, next) => {
  const entityId = req.params[entity];

  if (mongoose.Types.ObjectId.isValid(entityId)) {
    // Si el ID es un ObjectId válido, continúa con la ejecución normal de la solicitud
    next();
  } else {
    // Si el ID no es válido, utiliza el util ErrorApp para crear un objeto de error personalizado.
    const error = ErrorApp(`ID ${entityId} proporcionado no es un ObjectId válido de MongoDB.`, 400);
    next(error); // Pasa el objeto de error al siguiente middleware (globalError)
  }
};
