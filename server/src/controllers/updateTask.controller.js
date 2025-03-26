import Task from '../models/task.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

const updateTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, dueDate, completed } = req.body;

  if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
    return next(new ApiError(400, 'Invalid task ID format'));
  }

  const task = await Task.findById(id);
  if (!task) {
    return next(new ApiError(404, 'Task not found'));
  }

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length === 0) {
      return next(new ApiError(400, 'Title must be a non-empty string'));
    }
    task.title = title.trim();
  }

  if (description !== undefined) {
    if (typeof description !== 'string') {
      return next(new ApiError(400, 'Description must be a string'));
    }
    task.description = description.trim();
  }

  if (dueDate !== undefined) {
    const newDueDate = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(newDueDate.getTime()) || newDueDate < today) {
      return next(new ApiError(400, 'Due date must be a valid future date'));
    }

    task.dueDate = newDueDate;
  }

  if (completed !== undefined) {
    if (typeof completed !== 'boolean') {
      return next(new ApiError(400, 'Completed must be a boolean value'));
    }
    task.completed = completed;
  }

  await task.save();

  return res
    .status(200)
    .json(new ApiResponse(200, 'Task updated successfully', task));
});

export default updateTask;
