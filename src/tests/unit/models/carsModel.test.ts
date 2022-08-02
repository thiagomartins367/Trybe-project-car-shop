import * as sinon from 'sinon';
import chai from 'chai';
import CarsModel from '../../../models/CarsModel';
import { carMock, carMockWithId, carsMockWithId } from '../mocks/carsMock';
import { Model } from 'mongoose';
const { expect } = chai;

describe('Cars Model', () => {
  const carsModel = new CarsModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves(carsMockWithId);
    sinon.stub(Model, 'findById').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
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

  describe('Listar todos os carros', () => {
    it('com sucesso', async () => {
      const cars = await carsModel.read();
      expect(cars).to.be.eql(carsMockWithId);
    });
  });

  describe('Listar carro por id', () => {
    it('com sucesso', async () => {
      const car = await carsModel.readOne(carMockWithId._id as string);
      expect(car).to.be.eql(carMockWithId);
    });

    it('com "_id" inválido estora um erro', async () => {
      const testResult = { errorIn: '', passed: false };
      try {
        await carsModel.readOne(`${carMockWithId._id}E` as string);
        testResult.passed = false;
        testResult.errorIn = `first test with _id: ${carMockWithId._id}E`;
      } catch (error: any) {
        testResult.passed = true;
        expect(error.message.length > 0).to.be.eql(true);
      }
      expect(testResult).to.be.eql({ errorIn: '', passed: true });

      const otherId = carMockWithId._id as string;
      try {
        await carsModel.readOne(otherId.substring(0, otherId.length - 1));
        testResult.passed = false;
        testResult.errorIn = `second test with _id: ${otherId.substring(0, otherId.length - 1)}`;
      } catch (error: any) {
        testResult.passed = true;
        expect(error.message.length > 0).to.be.eql(true);
      }
      expect(testResult).to.be.eql({ errorIn: '', passed: true });
    });
  });

  describe('Atualizar carro por id', () => {
    it('com sucesso', async () => {
      const car = await carsModel.update(carMockWithId._id as string, carMock);
      expect(car).to.be.eql(carMockWithId);
    });

    it('com "_id" inválido estora um erro', async () => {
      const testResult = { errorIn: '', passed: false };
      try {
        await carsModel.update(`${carMockWithId._id}E` as string, carMock);
        testResult.passed = false;
        testResult.errorIn = `first test with _id: ${carMockWithId._id}E`;
      } catch (error: any) {
        testResult.passed = true;
        expect(error.message.length > 0).to.be.eql(true);
      }
      expect(testResult).to.be.eql({ errorIn: '', passed: true });

      const otherId = carMockWithId._id as string;
      try {
        await carsModel.update(otherId.substring(0, otherId.length - 1), carMock);
        testResult.passed = false;
        testResult.errorIn = `second test with _id: ${otherId.substring(0, otherId.length - 1)}`;
      } catch (error: any) {
        testResult.passed = true;
        expect(error.message.length > 0).to.be.eql(true);
      }
      expect(testResult).to.be.eql({ errorIn: '', passed: true });
    });
  });

});