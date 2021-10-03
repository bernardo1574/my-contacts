import { inject, injectable } from 'tsyringe';
import {
  IUsersRepository,
  IUsers,
} from '@modules/Users/repositories/IUserRepository';
import moment from 'moment';

@injectable()
class ListAllUsersRepository {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute(): Promise<IUsers[]> {
    const users = await this.userRepository.listAll();
    const formarttedUsers = users.map(user => {
      return {
        ...user,
        lastAcess: moment(user.lastAcess).format('DD/MM/YYYY HH:MM:ss'),
      };
    });
    return formarttedUsers;
  }
}

export { ListAllUsersRepository };
