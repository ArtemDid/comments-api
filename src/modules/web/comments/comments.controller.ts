import { ExpressRequest, ExpressResponse } from '../../../common/types';
// import { getDomainsQueue } from '../../../queues/domains.queue';
// import { urlsRepository } from '../../../common/repositories/urls.repository';
// import { IDomainDB } from '../../../common/db/interfaces/domain.interface';

const getStatusByPublisher = async (req: ExpressRequest, res: ExpressResponse) => {
  // const statusByPublisher: Array<IDomainDB> = await urlsRepository.getListDomainsByPublisher(req.params.publisher_id);

  res.json({
    status: 'success',
  });
};

export const CrawlerController = {
  getStatusByPublisher,
};
