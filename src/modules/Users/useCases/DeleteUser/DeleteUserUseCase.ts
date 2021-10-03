import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '@modules/Users/repositories/IUserRepository';

interface IRequest {
  id: string;
}
@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const userExists = await this.userRepository.findById(id);
    if (!userExists) {
      throw new AppError(`User not found`);
    }

    await this.userRepository.delete(id);
  }
}

export { DeleteUserUseCase };
