import { Router } from 'express';
import CarsController from '../controllers/CarsController';
import CarsModel from '../models/CarsModel';
import CarsService from '../services/CarsService';

const routes = Router();

const carsModel = new CarsModel();
const carsService = new CarsService(carsModel);
const carsController = new CarsController(carsService);

routes.post('/', (req, res) => carsController.create(req, res));
routes.get('/:id', (req, res) => carsController.readOne(req, res));
routes.get('/', (req, res) => carsController.read(req, res));
routes.put('/:id', (req, res) => carsController.update(req, res));

export default routes;
