import Task from '../models/task.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const createTask = asyncHandler(async (req, res) => {
  const newTask = await Task.create(req.body);

  res
    .status(201)
    .json(new ApiResponse(201, 'Task created successfully', newTask));
});

export default createTask;
