import * as sinon from 'sinon';
import chai from 'chai';
import CarsModel from '../../../models/CarsModel';
import CarsService from '../../../services/CarsService';
import CarsController from '../../../controllers/CarsController';
import { Request, Response } from 'express';
import { carMock, carMockWithId, carsMockWithId } from '../mocks/carsMock';
const { expect } = chai;

describe('Cars Controller', () => {
  const carsModel = new CarsModel();
  const carsService = new CarsService(carsModel);
  const carsController = new CarsController(carsService);

  const req = {} as Request; 
  const res = {} as Response;

  before(() => {
    sinon.stub(carsService, 'create').resolves(carMockWithId);
    sinon.stub(carsService, 'read').resolves(carsMockWithId);
    sinon.stub(carsService, 'readOne').resolves(carMockWithId);
    sinon.stub(carsService, 'update').resolves(carMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  });

  describe('Adicionar novo carro', () => {
    it('com sucesso', async () => {
      req.body = carMock;
      await carsController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.equal(true);
    });
  });

  describe('Listar todos os carros', () => {
    it('com sucesso', async () => {
      await carsController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(carsMockWithId)).to.be.equal(true);
    });
  });

  describe('Listar carro por id', () => {
    it('com sucesso', async () => {
      req.params = { id: carMockWithId._id as string };
      await carsController.readOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.equal(true);
    });
  });

  describe('Atualizar carro por id', () => {
    it('com sucesso', async () => {
      req.params = { id: carMockWithId._id as string };
      req.body = carMock;
      await carsController.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.equal(true);
    });
  });

});