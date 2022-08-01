import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import { IidDocument } from '../interfaces/IidDocument';
import { IModel } from '../interfaces/IModel';

type CarsSchema = IidDocument & ICar;

const carsMongooseSchema = new Schema<CarsSchema>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

class CarsModel implements IModel<ICar> {
  constructor(
    private _model = mongooseCreateModel('cars', carsMongooseSchema),
  ) {}

  public async create(body: ICar): Promise<ICar & IidDocument> {
    return this._model.create({ ...body });
  }

  public async readAll(): Promise<ICar[] | []> {
    return this._model.find();
  }
}

export default CarsModel;
