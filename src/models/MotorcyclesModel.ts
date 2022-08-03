import {
  isValidObjectId,
  model as mongooseCreateModel,
  Schema,
} from 'mongoose';
import { ErrorTypes } from '../errors/catalog';
import { IidDocument } from '../interfaces/IidDocument';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle } from '../interfaces/IMotorcycle';

type MotorcycleSchema = IidDocument & IMotorcycle;

const motorcycleMongooseSchema = new Schema<MotorcycleSchema>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

class MotorcyclesModel implements IModel<IMotorcycle> {
  constructor(
    private _model = mongooseCreateModel(
      'motorcycles',
      motorcycleMongooseSchema,
    ),
  ) {}

  public async create(body: IMotorcycle): Promise<IMotorcycle & IidDocument> {
    return this._model.create({ ...body });
  }

  public async read(): Promise<IMotorcycle[] | []> {
    return this._model.find();
  }

  public async readOne(_id: string): Promise<IMotorcycle | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);
    return this._model.findById({ _id });
  }
  
  public async update(
    _id: string,
    body: IMotorcycle,
  ): Promise<IMotorcycle | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);
    return this._model.findByIdAndUpdate(_id, body, {
      returnDocument: 'after',
    });
  }

  public async delete(_id: string): Promise<IMotorcycle | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);
    return this._model.findByIdAndDelete(_id);
  }
}

export default MotorcyclesModel;
