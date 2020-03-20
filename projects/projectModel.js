const db = require('../data/db-config.js');

module.exports = {
  insertProject,
  insertTask,
  insertResource,
  getProjects,
  getProjectById,
  getTasks,
  getTasksByProject,
  getResources,
  getResourcesByProject
};

function insertProject(project) {
  return db('projects')
    .insert(project)
    .then(ids => {
      return getProjectById(ids[0]);
    });
}

function insertTask(task) {
  return db('tasks')
    .insert(task)
    .then(ids => {
      return getTaskById(ids[0]);
    });
}

function insertResource(resourceDetails) {
  return db('resources')
    .where('description', resourceDetails.description)
    .then(resource => {
      if (resource) {
        const newProjectResource = {};
        newProjectResource.projectId = resourceDetails.projectId;
        newProjectResource.resourceId = resource.id;
        db('project_resources')
          .insert(newProjectResource)
          .then(ids => {
            return ids.length;
          });
      } else {
        const newResource = {};
        newResource.description = resourceDetails.description;
        newResource.notes = resourceDetails.notes;
        db('resources')
          .insert(newResource)
          .then(ids => {
            db('resouces')
              .where('id', ids[0])
              .first()
              .then(resource => {
                const newProjectResource = {};
                newProjectResource.projectId = resourceDetails.projectId;
                newProjectResource.resourceId = resource.id;

                db('project_resources')
                  .insert(newProjectResource)
                  .then(ids => {
                    return ids.length;
                  });
              });
          });
      }
    });
}

function getProjects() {
  return db('projects');
}

function getProjectById(id) {
  return db('project')
    .where({ id })
    .first();
}

function getTasks() {
  return db('tasks');
}

function getTaskById(id) {
  return db('tasks')
    .where({ id })
    .first();
}

function getTasksByProject(projectId) {
  return db('tasks')
    .join('projects', 'projects.id', '=', 'tasks.projectId')
    .select('projects.projectName', 'projects.descriptions', 'tasks.*')
    .where('tasks.projectId', projectId);
}

function getResources() {
  return db('resources');
}

function getResourcesByProject(projectId) {
  return db('projects')
    .join(
      'project_resources',
      'projects.id',
      '=',
      'project_resources.projectId'
    )
    .join('resources', 'project_resources.resourceId', '=', 'resources.id')
    .select('projects.id', 'projects.projectName', 'resources.description')
    .where('project_resources.projectId', projectId);
}
