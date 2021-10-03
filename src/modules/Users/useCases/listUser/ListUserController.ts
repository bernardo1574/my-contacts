import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUserUseCase } from './ListUserUseCase';

class ListUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const listUserUseCase = container.resolve(ListUserUseCase);

    const user = await listUserUseCase.execute(id);

    return res.json(user);
  }
}

export { ListUserController };
