import * as sinon from 'sinon';
import chai from 'chai';
import CarsModel from '../../../models/CarsModel';
import { carMock, carMockWithId, invalidCarsMock } from '../mocks/carsMock';
import CarsService from '../../../services/CarsService';
const { expect } = chai;

describe('Cars Service', () => {
  const carsModel = new CarsModel();
  const carsService = new CarsService(carsModel);

  before(() => {
    sinon.stub(carsModel, 'create').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  });

  describe('Adicionar novo carro', () => {
    it('com "body" da requisição válido', async () => {
      const newCar = await carsService.create(carMock);
      expect(newCar).to.be.eql(carMockWithId);
    });

    it('com "body" da requisição faltando qualquer atributo estora um erro', async () => {
      const carMockList = invalidCarsMock();
      const allCases = carMockList.map((mockObj) => {
        return carsService.create(mockObj as any);
      });
      const testResult = { passed: false };
      try {
        await Promise.all(allCases);
        testResult.passed = false;
      } catch (error: any) {
        expect(error.message.length > 0).to.be.equal(true);
        testResult.passed = true;
      }
      expect(testResult).to.be.eql({ passed: true });
    });

  });

});

