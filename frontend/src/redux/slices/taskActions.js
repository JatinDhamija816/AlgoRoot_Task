import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTask,
  fetchTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTaskApi,
} from "../../utils/api";

export const createTaskAsync = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      return await createTask(taskData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create task"
      );
    }
  }
);

export const fetchTasksAsync = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTasks();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tasks"
      );
    }
  }
);

export const fetchTaskByIdAsync = createAsyncThunk(
  "tasks/fetchTaskById",
  async (taskId, { rejectWithValue }) => {
    try {
      return await getTaskById(taskId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch task"
      );
    }
  }
);

export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, updatedData }, { rejectWithValue }) => {
    try {
      return await updateTask(taskId, updatedData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update task"
      );
    }
  }
);

export const updateTaskStatusAsync = createAsyncThunk(
  "tasks/updateTaskStatus",
  async ({ taskId, field }, { rejectWithValue }) => {
    try {
      return await updateTaskStatus(taskId, field);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update task status"
      );
    }
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      await deleteTaskApi(taskId);
      return taskId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete task"
      );
    }
  }
);
