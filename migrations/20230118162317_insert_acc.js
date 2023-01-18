exports.up = function (knex) {
  return knex('status_domain').insert([{ publisher_id: 1, domain: 'A', status: 'fsfds' }]);
};

exports.down = function (knex) {
  return knex('status_domain').delete().where('publisher_id', 1);
};
