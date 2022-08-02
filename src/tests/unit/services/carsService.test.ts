import * as sinon from 'sinon';
import chai from 'chai';
import CarsModel from '../../../models/CarsModel';
import { carMock, carMockWithId, carsMockWithId, invalidCarsMock } from '../mocks/carsMock';
import CarsService from '../../../services/CarsService';
const { expect } = chai;

describe('Cars Service', () => {
  const carsModel = new CarsModel();
  const carsService = new CarsService(carsModel);

  before(() => {
    sinon.stub(carsModel, 'create').resolves(carMockWithId);
    sinon.stub(carsModel, 'read').resolves(carsMockWithId);
    sinon.stub(carsModel, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(carsModel, 'update')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
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

  describe('Listar todos os carros', () => {
    it('com sucesso', async () => {
      const cars = await carsService.read();
      expect(cars).to.be.eql(carsMockWithId);
    });
  });

  describe('Listar carro por id', () => {
    it('com sucesso', async () => {
      const car = await carsService.readOne(carMockWithId._id as string);
      expect(car).to.be.eql(carMockWithId);
    });

    it('com "_id" que não existe estora um erro', async () => {
      const testResult = { passed: false };
      try {
        await carsService.readOne(carMockWithId._id as string);
      } catch (error: any) {
        testResult.passed = true;
        expect(error.message.length > 0).to.be.eql(true);
      }
      expect(testResult).to.be.eql({ passed: true });
    });
  });

  describe('Atualizar carro por id', () => {
    it('com sucesso', async () => {
      const car = await carsService.update(carMockWithId._id as string, carMock);
      expect(car).to.be.eql(carMockWithId);
    });
    it('com "body" da requisição faltando qualquer atributo estora um erro', async () => {
      const carMockList = invalidCarsMock();
      const allCases = carMockList.map((mockObj) => {
        return carsService.update(carMockWithId._id as string, mockObj as any);
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
    it('com "_id" que não existe estora um erro', async () => {
      const testResult = { passed: false };
      try {
        await carsService.update(carMockWithId._id as string, carMock);
      } catch (error: any) {
        testResult.passed = true;
        expect(error.message.length > 0).to.be.eql(true);
      }
      expect(testResult).to.be.eql({ passed: true });
    });
  });

});
