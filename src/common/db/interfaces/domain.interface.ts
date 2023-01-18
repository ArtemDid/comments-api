export interface IDomainDB {
  id: number;
  publisher_id: number;
  domain: string;
  status: 'pending' | 'active' | 'finished';
  created_at: string;
  updated_at: string;
  last_crawled: string;
}
