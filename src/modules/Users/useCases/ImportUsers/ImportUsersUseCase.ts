import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import fs from 'fs';
import csvParser from 'csv-parse';
import { IUsersRepository } from '@modules/Users/repositories/IUserRepository';

interface IJsonUsers {
  name: string;
  username: string;
  password: string;
}
interface IJsonParser {
  users: IJsonUsers[];
}

@injectable()
class ImportUsersUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  loadUsersCSV(file: Express.Multer.File): Promise<IJsonParser> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const allUsers: IJsonParser = { users: [] };
      const parseFile = csvParser();

      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          const [name, username, password] = line;
          allUsers.users.push({ name, username, password });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(allUsers);
        })
        .on('error', () => {
          reject(allUsers);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    let formattedFile: IJsonParser;
    const insertUsers: IJsonParser = { users: [] };

    if (file.mimetype === 'application/json') {
      formattedFile = JSON.parse(fs.readFileSync(file.path, 'utf8'));
      fs.promises.unlink(file.path);
    } else {
      formattedFile = await this.loadUsersCSV(file);
    }
    await Promise.all(
      formattedFile.users.map(async user => {
        const findUser = await this.userRepository.findByUsername(
          user.username,
        );
        if (!findUser) {
          insertUsers.users.push({
            ...user,
            password: await hash(user.password.toString(), 8),
          });
        }
      }),
    );
    if (insertUsers.users.length > 0) {
      await this.userRepository.createMultiple(insertUsers.users);
    }
  }
}

export { ImportUsersUseCase };
