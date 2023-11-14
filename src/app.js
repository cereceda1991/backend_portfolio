import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import routes from './routes/routes';
import configureSwagger from './config/swagger';
import { globalError } from './middlewares/globalError.middleware';
import { configurePassport } from './config/auth/passportAuth';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Configura Passport y las sesiones
configurePassport(app);

// Utiliza la aplicación configurada que incluye todas las rutas
app.use('/', routes);

// Configurar Swagger UI
configureSwagger(app);

// Configura Express para servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Ruta de inicio que muestra el archivo "index.html"
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Monta el middleware global de manejo de errores
app.use(globalError);

export default app;
