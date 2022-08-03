import { Router } from 'express';
import carsRoutes from './carsRoutes';
import motorcyclesRoutes from './motorcyclesRoutes';

const routes = Router();

routes.use('/cars', carsRoutes);
routes.use('/motorcycles', motorcyclesRoutes);

export default routes;
