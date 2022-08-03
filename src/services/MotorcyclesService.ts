import { ErrorTypes } from '../errors/catalog';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, mergedSchema } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';

class MotorcyclesService implements IService<IMotorcycle> {
  constructor(private _model: IModel<IMotorcycle>) {}

  public async create(body: IMotorcycle): Promise<IMotorcycle> {
    const parsed = mergedSchema.safeParse(body);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._model.create(body);
  }

  public async read(): Promise<IMotorcycle[] | []> {
    return this._model.read();
  }

  public async readOne(_id: string): Promise<IMotorcycle | null> {
    const motorcycle = await this._model.readOne(_id);
    if (!motorcycle) {
      throw new Error(ErrorTypes.ObjectNotFound);
    }
    return motorcycle;
  }

  public async update(
    _id: string,
    body: IMotorcycle,
  ): Promise<IMotorcycle | null> {
    const parsed = mergedSchema.safeParse(body);
    if (!parsed.success) {
      throw parsed.error;
    }
    const editedMotorcycle = await this._model.update(_id, body);
    if (!editedMotorcycle) {
      throw new Error(ErrorTypes.ObjectNotFound);
    }
    return editedMotorcycle;
  }

  public async delete(_id: string): Promise<IMotorcycle | null> {
    const motorcycleRemoved = await this._model.delete(_id);
    if (!motorcycleRemoved) {
      throw new Error(ErrorTypes.ObjectNotFound);
    }
    return motorcycleRemoved;
  }
}

export default MotorcyclesService;
