import { ErrorTypes } from '../errors/catalog';
import { mergedSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

class CarsService implements IService<ICar> {
  constructor(private _carsModel: IModel<ICar>) {}

  public async create(body: ICar): Promise<ICar> {
    const parsed = mergedSchema.safeParse(body);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._carsModel.create(body);
  }

  public async read(): Promise<ICar[] | []> {
    return this._carsModel.read();
  }

  public async readOne(_id: string): Promise<ICar | null> {
    const car = await this._carsModel.readOne(_id);
    if (!car) {
      throw new Error(ErrorTypes.ObjectNotFound);
    }
    return car;
  }

  public async update(_id: string, body: ICar): Promise<ICar | null> {
    const parsed = mergedSchema.safeParse(body);
    if (!parsed.success) {
      throw parsed.error;
    }
    const editedCar = await this._carsModel.update(_id, body);
    if (!editedCar) {
      throw new Error(ErrorTypes.ObjectNotFound);
    }
    return editedCar;
  }
}

export default CarsService;
