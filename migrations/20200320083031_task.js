exports.up = function(knex) {
  return knex.schema.createTable('tasks', tbl => {
    tbl.increments();
    tbl
      .integer('projectId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.string('description').notNullable();
    tbl.string('notes');
    tbl
      .boolean('complete')
      .notNullable()
      .defaultsTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tasks');
};
