interface ICreateUserDTO {
  id?: string;
  name: string;
  username: string;
  password: string;
}

interface IUsers {
  id?: string;
  name: string;
  username: string;
  password?: string;
  lastAcess: Date | string;
}

interface IUpdateUserLastAcess {
  username: string;
  lastAcess: string;
}

interface IUsersRepository {
  findById(id: string): Promise<IUsers>;
  findByUsername(username: string): Promise<IUsers>;
  list(id: string): Promise<IUsers>;
  listAll(): Promise<IUsers[]>;
  create(user: ICreateUserDTO): Promise<void>;
  createMultiple(users: ICreateUserDTO[]): Promise<void>;
  update({ name, password, username, id }: ICreateUserDTO): Promise<void>;
  updateLastAcess({ lastAcess, username }: IUpdateUserLastAcess): Promise<void>;
  delete(id: string): Promise<void>;
}

export { ICreateUserDTO, IUsersRepository, IUsers, IUpdateUserLastAcess };
