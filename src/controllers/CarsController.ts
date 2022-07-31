import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

class CarsController {
  constructor(private _service: IService<ICar>) {}

  public async create(req: Request, res: Response) {
    const { body }: { body: ICar } = req;
    const result = await this._service.create(body);
    return res.status(201).json(result);
  }
}

export default CarsController;