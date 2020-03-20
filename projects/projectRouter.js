const express = require('express');
const Project = require('./projectModel.js');
const router = express.Router();

//add a new project
router.post('/', (req, res) => {
  const project = req.body;
  Project.insertProject(project)
    .then(newProject => {
      console.log(newProject);
      res.status(201).json(newProject);
    })
    .catch(err =>
      res.status(500).json({ message: 'There was an error adding the project' })
    );
});

//add a new task
router.post('/:projectId/task', (req, res) => {
  const task = req.body;
  const { projectId } = req.params;
  task.projectId = projectId;
  Project.insertTask(task)
    .then(task => res.status(201).json(task))
    .catch(err =>
      status(500).json({ message: 'There was an error adding the task' })
    );
});

//add a new resource
router.post('/:projectId/resource', (req, res) => {
  const resourceDetails = req.body;
  const { projectId } = req.params;
  resourceDetails.projectId = projectId;

  Project.insertResource(resourceDetails)
    .then(numInserted =>
      res.status(201).json({ message: `Inserted ${numInserted} resources` })
    )
    .catch(err =>
      res
        .status(500)
        .json({ message: 'There was an error adding the resource' })
    );
});

//get list of projects
router.get('/', (req, res) => {
  Project.getProjects()
    .then(projects => res.status(200).json(projects))
    .catch(err =>
      res
        .status(500)
        .json({ message: 'There was an error getting the projects' })
    );
});

//get list of tasks
router.get('/tasks', (req, res) => {
  Project.getTasks()
    .then(tasks => res.status(200).json(tasks))
    .catch(err =>
      res.status(500).json({ message: 'There was an error getting the tasks' })
    );
});

//get list of tasks by projectId
router.get('/:projectId/tasks', (req, res) => {
  const { projectId } = req.params;
  Project.getTasksByProject(projectId)
    .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch(err =>
      res.status(500).json({ message: 'There was an error getting the tasks' })
    );
});

//get list of resources
router.get('/resources', (req, res) => {
  Project.getResources()
    .then(resources => res.status(200).json(resources))
    .catch(err =>
      res
        .status(500)
        .json({ message: 'There was an error getting the resources' })
    );
});

//get list of resources by projectId
router.get('/:projectId/resources', (req, res) => {
  const { projectId } = req.params;
  Project.getResourcesByProject(projectId)
    .then(resources => res.status(200).json(resources))
    .catch(err =>
      res
        .status(500)
        .json({ message: 'There was an error getting the resources' })
    );
});

module.exports = router;
