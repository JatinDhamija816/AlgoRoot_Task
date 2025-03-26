import Task from '../models/task.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

const getTaskById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Validate MongoDB ObjectId
  if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
    return next(new ApiError(400, 'Invalid task ID format'));
  }

  // Fetch task & exclude Mongoose metadata fields if unnecessary
  const task = await Task.findById(id).select('-__v');

  if (!task) {
    return next(new ApiError(404, 'Task not found'));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Task retrieved successfully', task));
});

export default getTaskById;
