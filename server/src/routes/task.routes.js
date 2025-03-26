import express from 'express';
import createTask from '../controllers/createTask.controller.js';
import getAllTasks from '../controllers/getAllTask.controller.js';
import getTaskById from '../controllers/getTaskById.controller.js';
import updateTask from '../controllers/updateTask.controller.js';
import updateTaskStatus from '../controllers/updateTaskStatus.controller.js';
import deleteTask from '../controllers/deleteTask.controller.js';

const router = express.Router();

// Tasks collection
router
  .route('/tasks')
  .post(createTask) // Create a new task
  .get(getAllTasks); // Retrieve all tasks

// Single task operations
router
  .route('/tasks/:id')
  .get(getTaskById) // Retrieve a task by ID
  .put(updateTask) // Update task details
  .delete(deleteTask); // Delete a task

// Toggle completed/important status
router.patch('/tasks/:id/status', updateTaskStatus);

export default router;
