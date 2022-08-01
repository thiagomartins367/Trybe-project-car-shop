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
}

export default CarsService;
