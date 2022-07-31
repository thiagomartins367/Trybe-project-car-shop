import { Router } from 'express';
import carsRoutes from './carsRoutes';

const routes = Router();

routes.use('/cars', carsRoutes);

export default routes;
