import fs from 'fs';
import { generateSwaggerDefinitionFromSchema } from './generateSwaggerDefinitionFromSchema ';
import schemaDefinitions from './schemas';

// Genera definiciones Swagger para los esquemas de forma dinámica
const swaggerDefinitions = {};

for (const [schemaName, Schema] of Object.entries(schemaDefinitions)) {
  const schemaSwaggerDefinition = generateSwaggerDefinitionFromSchema(Schema.schema);
  swaggerDefinitions[schemaName] = schemaSwaggerDefinition;
}

// Convierte el objeto en formato JSON
const swaggerJSON = JSON.stringify(swaggerDefinitions, null, 2);

// Guarda el JSON en un archivo
fs.writeFileSync('./docs/swaggerSchema.json', swaggerJSON, 'utf-8');

console.log(
  'Esquemas Swagger generados y guardados en docs/swaggerSchema.json, copia el contenido y pega en swaggerDefinition en la sección de Schemas',
);
