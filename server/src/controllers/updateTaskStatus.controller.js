import Task from '../models/task.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

const updateTaskStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { field } = req.body;

  // Validate ID format
  if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
    return next(new ApiError(400, 'Invalid task ID format.'));
  }

  // Validate the field
  if (!['completed', 'important'].includes(field)) {
    return next(
      new ApiError(400, "Invalid field. Use 'completed' or 'important'.")
    );
  }

  const task = await Task.findById(id);
  if (!task) {
    return next(new ApiError(404, 'Task not found.'));
  }

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { $set: { [field]: !task[field] } }, // Toggle boolean value using $set
    { new: true } // Return the updated document
  );

  if (!updatedTask) {
    return next(new ApiError(404, 'Task not found.'));
  }

  res
    .status(200)
    .json(new ApiResponse(200, `Task ${field} status updated`, updatedTask));
});

export default updateTaskStatus;
