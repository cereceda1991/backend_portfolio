import swaggerUi from 'swagger-ui-express';

// Importa la especificación Swagger desde el archivo JSON
import swaggerDefinition from '../../docs/swaggerDefinition.json';

export default function configureSwagger(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));
}
