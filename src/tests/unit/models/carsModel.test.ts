import * as sinon from 'sinon';
import chai from 'chai';
import CarsModel from '../../../models/CarsModel';
import { carMock, carMockWithId } from '../mocks/carsMock';
import { Model } from 'mongoose';
const { expect } = chai;

describe('Cars Model', () => {
  const carsModel = new CarsModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe('Adicionar novo carro', () => {
    it('com sucesso', async () => {
      const newCar = await carsModel.create(carMock);
      expect(newCar).to.be.eql(carMockWithId);
    });
  });

});