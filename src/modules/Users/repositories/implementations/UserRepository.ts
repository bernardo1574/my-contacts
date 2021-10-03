import { PrismaClient } from '@prisma/client';
import {
  ICreateUserDTO,
  IUpdateUserLastAcess,
  IUsers,
  IUsersRepository,
} from '../IUserRepository';

class UserRepository implements IUsersRepository {
  private repository = new PrismaClient();

  async findByUsername(username: string): Promise<IUsers> {
    const user = await this.repository.user.findFirst({
      where: { username },
    });
    return user;
  }

  async findById(id: string): Promise<IUsers> {
    const user = await this.repository.user.findFirst({ where: { id } });
    return user;
  }

  async list(id: string): Promise<IUsers> {
    const user = await this.repository.user.findFirst({
      where: { id },
      select: {
        password: false,
        id: false,
        name: true,
        lastAcess: true,
        username: true,
      },
    });
    return user;
  }
  async listAll(): Promise<IUsers[]> {
    const users = await this.repository.user.findMany({
      select: {
        password: false,
        id: true,
        name: true,
        lastAcess: true,
        username: true,
      },
    });
    return users;
  }
  async create(user: ICreateUserDTO): Promise<void> {
    await this.repository.user.create({ data: user });
  }
  async createMultiple(users: ICreateUserDTO[]): Promise<void> {
    await this.repository.user.createMany({
      data: users,
    });
  }
  async update({
    name,
    password,
    username,
    id,
  }: ICreateUserDTO): Promise<void> {
    await this.repository.user.update({
      where: { id },
      data: { name, password, username },
    });
  }
  async updateLastAcess({
    lastAcess,
    username,
  }: IUpdateUserLastAcess): Promise<void> {
    await this.repository.user.update({
      where: { username },
      data: { lastAcess },
    });
  }
  async delete(id: string): Promise<void> {
    await this.repository.user.delete({
      where: { id },
    });
  }
}

export { UserRepository };
