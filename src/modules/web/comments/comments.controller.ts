import { ExpressRequest, ExpressResponse } from '../../../common/types';
// import { getDomainsQueue } from '../../../queues/domains.queue';
import { urlsRepository } from '../../../common/repositories/comments.repository';
// import { IDomainDB } from '../../../common/db/interfaces/domain.interface';

const getStatusByPublisher = async (req: ExpressRequest, res: ExpressResponse) => {
  const statusByPublisher: Array<any> = await urlsRepository.getListDomainsByPublisher('asfs');
  const statusByPublisher2: Array<any> = await urlsRepository.getListDomainsByPublisher2(1);

  res.json({
    status: statusByPublisher,
    domain: statusByPublisher2,
  });
};

export const CrawlerController = {
  getStatusByPublisher,
};
