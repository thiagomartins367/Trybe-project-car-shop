import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import { IidDocument } from '../interfaces/IidDocument';
import { IModel } from '../interfaces/IModel';
import { ImongooseKey } from '../interfaces/ImongooseKey';

type CarsSchema = IidDocument & ICar & ImongooseKey;

const carsMongooseSchema = new Schema<CarsSchema>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
  __v: Number,
});

class CarsModel implements IModel<ICar> {
  constructor(
    private _model = mongooseCreateModel('cars', carsMongooseSchema),
  ) {}

  public async create(body: ICar): Promise<ICar & IidDocument> {
    const newCar: CarsSchema = (await this._model.create({ ...body })).toJSON();
    const documentId = newCar._id;
    delete newCar._id;
    if (Object.keys(newCar).includes('__v')) {
      delete newCar.__v;
    }
    return {
      _id: documentId,
      ...newCar,
    };
  }
}

export default CarsModel;
