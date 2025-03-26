import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTask,
  fetchTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTaskApi,
} from "../../utils/api";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  selectedTask: null,
};

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

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTaskByIdAsync.fulfilled, (state, action) => {
        state.selectedTask = action.payload;
      })

      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) state.tasks[index] = action.payload;
      })

      .addCase(updateTaskStatusAsync.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t._id === action.payload._id);
        if (task) Object.assign(task, action.payload);
      })

      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default taskSlice.reducer;
