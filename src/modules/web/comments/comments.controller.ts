import { ExpressRequest, ExpressResponse } from '../../../common/types';
// import { getDomainsQueue } from '../../../queues/domains.queue';
import { urlsRepository } from '../../../common/repositories/comments.repository';
// import { IDomainDB } from '../../../common/db/interfaces/domain.interface';

const getStatusByPublisher = async (req: ExpressRequest, res: ExpressResponse) => {
  const statusByPublisher: Array<any> = await urlsRepository.getListDomainsByPublisher('sgdgdf');

  res.json({
    status: statusByPublisher,
  });
};

export const CrawlerController = {
  getStatusByPublisher,
};
