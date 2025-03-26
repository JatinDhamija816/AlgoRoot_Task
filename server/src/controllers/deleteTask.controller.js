import Task from '../models/task.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

const deleteTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
    return next(new ApiError(400, 'Invalid task ID format.'));
  }

  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    return next(new ApiError(404, 'Task not found.'));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Task deleted successfully', task));
});

export default deleteTask;
