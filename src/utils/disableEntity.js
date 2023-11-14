import ErrorApp from './ErrorApp';

const disableEntity = async (Model, entityId, entityName) => {
  const entity = await Model.findById(entityId);

  if (!entity) {
    // Si entity es null, significa que el entity no fue encontrado
    const error = ErrorApp(`${entityName} no se ha encontrado`, 404);
    throw error; // Lanza un error personalizado para manejarlo más adelante
  }

  if (!entity.isActive) {
    // Utiliza ErrorApp para crear un objeto de error personalizado
    const error = ErrorApp(`${entityName} con ID: ${entityId} ya ha sido desactivado`, 400);
    throw error; // Lanza el error personalizado creado con ErrorApp
  }

  // Desactivar la entidad
  entity.isActive = false;
  await entity.save();

  return entity;
};

export default disableEntity;
