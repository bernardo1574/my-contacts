import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAllUsersRepository } from './ListAllUsersUseCase';

class ListAllUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listAllUsersUseCase = container.resolve(ListAllUsersRepository);
    const users = await listAllUsersUseCase.execute();

    return res.json(users);
  }
}

export { ListAllUsersController };
