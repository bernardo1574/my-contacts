import multer from 'multer';
import { Router } from 'express';
import { CreateUserController } from '@modules/Users/useCases/CreateUser/CreateUserController';
import { DeleteUserController } from '@modules/Users/useCases/DeleteUser/DeleteUserController';
import { UpdateUserController } from '@modules/Users/useCases/UpdateUser/UpdateUserController';
import { ListAllUsersController } from '@modules/Users/useCases/listAllUsers/ListAllUsersController';
import { ListUserController } from '@modules/Users/useCases/listUser/ListUserController';
import { ImportUsersController } from '@modules/Users/useCases/ImportUsers/ImportUsersController';
import { EnsureAuthenticated } from '../middlewares/ensureAuthenticated';

const upload = multer({
  dest: './tmp',
});

const userRoutes = Router();

const listAllUsersController = new ListAllUsersController();
const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();
const listUserController = new ListUserController();
const importUsersController = new ImportUsersController();

userRoutes.get('/', EnsureAuthenticated, listAllUsersController.handle);
userRoutes.post('/', createUserController.handle);
userRoutes.put('/:id', EnsureAuthenticated, updateUserController.handle);
userRoutes.delete('/:id', EnsureAuthenticated, deleteUserController.handle);
userRoutes.get('/:id', EnsureAuthenticated, listUserController.handle);
userRoutes.post(
  '/import',
  EnsureAuthenticated,
  upload.single('file'),
  importUsersController.handle,
);

export { userRoutes };
