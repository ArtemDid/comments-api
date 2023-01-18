import { getLogger } from '../../../common/logging';
import { APIError, HttpStatusCode } from '../../../common/errors';
import { urlsRepository } from './users.repository';
import { IUserDB } from './users.types';
import { ExpressResponse } from 'common/types';
import { generateToken } from '../../common/utils/token.utils';

const createUser = async (data: any, res: ExpressResponse) => {
  const { user_name, email, home_page } = data;
  const log = getLogger();

  const user: Array<IUserDB> = await urlsRepository.getUserByEmailName(email);

  if (user.length) {
    if (user[0].email === email) {
      return { status: 400, message: `User with email: ${email} already exists` };
    }
  }

  const newUser: Array<IUserDB> = await urlsRepository.insertUser(data);
  log.info(`User with email: ${email} was created`);

  const token: string = generateToken(newUser[0].id);

  return { status: 200, token };
};

const loginUser = async (data: any, res: ExpressResponse) => {
  const { user_name, email } = data;
  const log = getLogger();

  const user: Array<IUserDB> = await urlsRepository.getUserByEmailName(email, user_name);

  if (!user.length) {
    return { status: 400, message: `The credentials ${user_name} is incorrect` };
  }

  const token: string = generateToken(user[0].id);

  return { status: 200, token };
};

export const usersService = {
  createUser,
  loginUser,
};
