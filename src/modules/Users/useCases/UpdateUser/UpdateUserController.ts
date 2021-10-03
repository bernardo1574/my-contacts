import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, username, password } = req.body;
    const { id } = req.params;

    const createUserUseCase = container.resolve(UpdateUserUseCase);

    await createUserUseCase.execute({ name, username, password, id });

    return res.status(201).send();
  }
}

export { UpdateUserController };
