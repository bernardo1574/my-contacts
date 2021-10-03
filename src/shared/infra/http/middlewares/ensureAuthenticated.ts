import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '@shared/errors/AppError';
import { UserRepository } from '@modules/Users/repositories/implementations/UserRepository';

interface IPayload {
  sub: string;
}
async function EnsureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [_, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      'JS2uCcpFACz3tOLn4CrGctRHLs05m7zxPrhSJMYJPMD9cOnXRU',
    ) as IPayload;

    const userRepository = new UserRepository();
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists!', 401);
    }

    request.user = {
      id: user_id,
    };
    next();
  } catch (error) {
    throw new AppError('Invalid Token!', 401);
  }
}

export { EnsureAuthenticated };
