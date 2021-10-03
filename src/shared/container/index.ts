import { container } from 'tsyringe';
import { IUsersRepository } from '@modules/Users/repositories/IUserRepository';
import { UserRepository } from '@modules/Users/repositories/implementations/UserRepository';

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);
