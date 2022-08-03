import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';

class MotorcyclesController {
  constructor(private _service: IService<IMotorcycle>) {}

  public async create(req: Request, res: Response) {
    const { body }: { body: IMotorcycle } = req;
    const result = await this._service.create(body);
    return res.status(201).json(result);
  }

  public async read(_req: Request, res: Response) {
    const result = await this._service.read();
    return res.status(200).json(result);
  }

  public async readOne(req: Request, res: Response) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response) {
    const { body }: { body: IMotorcycle } = req;
    const result = await this._service.update(req.params.id, body);
    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response) {
    await this._service.delete(req.params.id);
    return res.status(204).end();
  }
}

export default MotorcyclesController;
