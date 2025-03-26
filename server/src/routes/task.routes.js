import express from 'express';
import createTask from '../controllers/createTask.controller.js';
import getAllTasks from '../controllers/getAllTask.controller.js';
import getTaskById from '../controllers/getTaskById.controller.js';
import updateTask from '../controllers/updateTask.controller.js';
import updateTaskStatus from '../controllers/updateTaskStatus.controller.js';
import deleteTask from '../controllers/deleteTask.controller.js';

const router = express.Router();

router.route('/tasks').post(createTask).get(getAllTasks);

router.route('/tasks/:id').get(getTaskById).put(updateTask).delete(deleteTask);

router.patch('/tasks/:id/status', updateTaskStatus);

export default router;
