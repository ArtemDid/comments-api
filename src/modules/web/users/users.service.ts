import { getLogger } from '../../../common/logging';
import { usersRepository } from './users.repository';
import { IUserDB } from './users.types';
import { generateToken } from '../../common/utils/token.utils';

const createUser = async (data: any) => {
  const { user_name, email, home_page } = data;
  const log = getLogger();

  const user: Array<IUserDB> = await usersRepository.getUserByEmailName(email);

  if (user.length) {
    if (user[0].email === email) {
      return { status: 400, message: `User with email: ${email} already exists` };
    }
  }

  const newUser: Array<IUserDB> = await usersRepository.insertUser(data);
  log.info(`User with email: ${email} was created`);

  const token: string = generateToken(newUser[0].id);

  return { status: 200, token, name: newUser[0].user_name, email: newUser[0].email };
};

const loginUser = async (data: any) => {
  const { user_name, email } = data;

  const user: Array<IUserDB> = await usersRepository.getUserByEmailName(email, user_name);

  if (!user.length) {
    return { status: 400, message: `The credentials ${user_name} is incorrect` };
  }

  const token: string = generateToken(user[0].id);

  return { status: 200, token, name: user[0].user_name, email: user[0].email };
};

export const usersService = {
  createUser,
  loginUser,
};
