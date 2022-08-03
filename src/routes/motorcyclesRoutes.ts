import { Router } from 'express';
import MotorcyclesController from '../controllers/MotorcyclesController';
import MotorcyclesModel from '../models/MotorcyclesModel';
import MotorcyclesService from '../services/MotorcyclesService';

const routes = Router();

const motorcyclesModel = new MotorcyclesModel();
const motorcyclesService = new MotorcyclesService(motorcyclesModel);
const motorcyclesController = new MotorcyclesController(motorcyclesService);

routes.post('/', (req, res) => motorcyclesController.create(req, res));
routes.get('/', (req, res) => motorcyclesController.read(req, res));
routes.get('/:id', (req, res) => motorcyclesController.readOne(req, res));
routes.put('/:id', (req, res) => motorcyclesController.update(req, res));
routes.delete('/:id', (req, res) => motorcyclesController.delete(req, res));

export default routes;
