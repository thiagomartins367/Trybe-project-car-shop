import {
  isValidObjectId,
  model as mongooseCreateModel,
  Schema,
} from 'mongoose';
import { ErrorTypes } from '../errors/catalog';
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

  public async read(): Promise<ICar[] | []> {
    return this._model.find();
  }

  public async readOne(_id: string): Promise<ICar | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);
    return this._model.findById({ _id });
  }
}

export default CarsModel;
