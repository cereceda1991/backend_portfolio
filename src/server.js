import app from './app';
import connectToDatabase from './config/db';

const port = process.env.PORT || 3000;

// Llama a la función de conexión a la base de datos
connectToDatabase()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    console.log(`Servidor escuchando en http://localhost:${port}`);
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });

// Manejo de errores en el puerto
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Aplicación Express corriendo en http://localhost:${port}`);
  });
}
