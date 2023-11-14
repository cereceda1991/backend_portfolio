import express from 'express';
import clientRoutes from './client.routes';
import authRoutes from './auth.routes';

const router = express.Router();

// Ruta de Autenticación
router.use('/api/v1/auth', authRoutes);
// Rutas de clientes
router.use('/api/v1/clients', clientRoutes);

export default router;
