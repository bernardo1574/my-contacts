import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/Users/repositories/IUserRepository';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    username: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}
  async execute({ username, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new AppError('Username incorrect');
    }
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Password incorrect');
    }
    const token = sign(
      {},
      'JS2uCcpFACz3tOLn4CrGctRHLs05m7zxPrhSJMYJPMD9cOnXRU',
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );
    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        username: user.username,
      },
    };

    const updateLastAcess = {
      lastAcess: new Date(Date.now()).toISOString(),
      username: user.username,
    };
    await this.userRepository.updateLastAcess(updateLastAcess);
    return tokenReturn;
  }
}
export { AuthenticateUserUseCase };
