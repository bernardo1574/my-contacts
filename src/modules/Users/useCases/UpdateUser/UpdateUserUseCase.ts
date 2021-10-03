import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '@modules/Users/repositories/IUserRepository';

interface IRequest {
  id: string;
  name: string;
  username: string;
  password: string;
}
@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute({ name, username, password, id }: IRequest): Promise<void> {
    const userExists = await this.userRepository.findById(id);
    if (!userExists) {
      throw new AppError(`User not found`);
    }
    if (username) {
      const userNameExists = await this.userRepository.findByUsername(username);
      if (userNameExists && userNameExists.id !== id) {
        throw new AppError(`${username} already exists`);
      }
    }

    await this.userRepository.update({ name, username, password, id });
  }
}

export { UpdateUserUseCase };
