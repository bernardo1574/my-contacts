import { inject, injectable } from 'tsyringe';
import {
  IUsers,
  IUsersRepository,
} from '@modules/Users/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';
import moment from 'moment';

@injectable()
class ListUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<IUsers> {
    if (!id) {
      throw new AppError('Param id is required');
    }
    const user = await this.userRepository.list(id);
    if (!user) {
      throw new AppError(`User not found`);
    }
    return {
      ...user,
      lastAcess: moment(user.lastAcess).format('DD/MM/YYYY HH:mm:ss'),
    };
  }
}

export { ListUserUseCase };
