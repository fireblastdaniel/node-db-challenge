exports.up = function(knex) {
  return knex.schema.createTable('project_resources', tbl => {
    tbl.primary(['projectId', 'resourceId']);
    tbl
      .integer('projectId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl
      .integer('resourceId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('references')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('project_resources');
};
