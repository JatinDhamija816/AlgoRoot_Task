import Task from '../models/task.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, 'Tasks retrieved successfully', tasks));
});

export default getAllTasks;
