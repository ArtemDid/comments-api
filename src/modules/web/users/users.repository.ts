// import * as _ from 'lodash';
import { IUserDB } from './users.types';
// import { IUrlDB } from '../db/interfaces/url.interface';
import { db } from '../../../common/db/knex';
// import { urlsRedisClient } from '../db/redis';
import { getLogger } from '../../../common/logging';

type DataUrlsType = {
  url: string;
  domain_id: number;
  is_has_asin: number;
};

const getUserByEmailName = async (email: string, user_name?: string): Promise<Array<IUserDB>> => {
  return db
    .select('*')
    .from('users')
    .modify((q) => {
      q.where({ email });
      if (user_name) q.where({ user_name });
    })
    .returning('*');
};

const insertUser = async (data: IUserDB): Promise<Array<IUserDB>> => {
  return db('users').insert(data).returning('*');
};

const getUserById = async (id: number): Promise<Array<IUserDB>> => {
  return db.select('*').from('users').where({ id }).returning('*');
};

export const usersRepository = {
  getUserByEmailName,
  insertUser,
  getUserById,
};
