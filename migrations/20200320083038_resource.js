exports.up = function(knex) {
  return knex.schema.createTable('resources', tbl => {
    tbl.increments();
    tbl.string('description').notNullable();
    tbl.string('notes');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('resources');
};
