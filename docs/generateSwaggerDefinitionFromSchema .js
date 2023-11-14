export const generateSwaggerDefinitionFromSchema = (schema) => {
  const swaggerDefinition = {
    type: 'object',
    properties: {},
    required: [],
  };

  // Recorre las propiedades del esquema
  for (const key in schema.paths) {
    if (Object.prototype.hasOwnProperty.call(schema.paths, key)) {
      const property = schema.paths[key];
      const propertyDefinition = {};

      // Define el tipo de datos en Swagger basado en el tipo de datos de Mongoose
      propertyDefinition.type = property.instance.toLowerCase();

      // Agregar descripción y formato desde los metadatos
      if (property.options.swagger) {
        propertyDefinition.description = property.options.swagger.description;
        propertyDefinition.format = property.options.swagger.format;
      }

      // Marca como requerido si es necesario
      if (property.isRequired) {
        swaggerDefinition.required.push(key);
      }

      // Agrega la propiedad al objeto Swagger
      swaggerDefinition.properties[key] = propertyDefinition;
    }
  }

  return swaggerDefinition;
};
