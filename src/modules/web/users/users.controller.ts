import { ExpressRequest, ExpressResponse } from '../../../common/types';
// import { getDomainsQueue } from '../../../queues/domains.queue';
import { urlsRepository } from '../../../common/repositories/comments.repository';
import { usersService } from './users.service';
// import { IDomainDB } from '../../../common/db/interfaces/domain.interface';

const createUser = async (req: ExpressRequest, res: ExpressResponse) => {
  const result = await usersService.createUser(req.query, res);

  return res.status(result.status).json({ result });
};

const login = async (req: ExpressRequest, res: ExpressResponse) => {
  const result = await usersService.loginUser(req.query, res);

  return res.status(result.status).json({ result });
};

export const UsersController = {
  createUser,
  login,
};
