import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '@modules/Users/repositories/IUserRepository';

interface IRequest {
  name: string;
  username: string;
  password: string;
}
@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute({ name, username, password }: IRequest): Promise<void> {
    const userExists = await this.userRepository.findByUsername(username);
    if (userExists) {
      throw new AppError('Username already exists', 401);
    }

    const passwordHash = await hash(password, 8);
    this.userRepository.create({ name, username, password: passwordHash });
  }
}

export { CreateUserUseCase };
