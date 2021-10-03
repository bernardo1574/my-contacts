import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const createUserUseCase = container.resolve(DeleteUserUseCase);

    await createUserUseCase.execute({ id });

    return res.status(201).send();
  }
}

export { DeleteUserController };
