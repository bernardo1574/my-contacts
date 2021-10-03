import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ImportUsersUseCase } from './ImportUsersUseCase';

class ImportUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req;
    const importUsersUseCase = container.resolve(ImportUsersUseCase);

    await importUsersUseCase.execute(file);

    return res.status(201).json();
  }
}

export { ImportUsersController };
