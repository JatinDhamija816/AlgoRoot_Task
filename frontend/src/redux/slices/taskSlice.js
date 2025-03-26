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
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTaskByIdAsync = createAsyncThunk(
  "tasks/fetchTaskById",
  async (taskId, { rejectWithValue }) => {
    try {
      return await getTaskById(taskId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTaskAsync = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      return await createTask(taskData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, updatedData }, { rejectWithValue }) => {
    try {
      return await updateTask(taskId, updatedData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "tasks/toggleComplete",
  async ({ taskId, completed }, { rejectWithValue }) => {
    try {
      return await updateTaskStatus(taskId, { completed });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleImportantAsync = createAsyncThunk(
  "tasks/toggleImportant",
  async (taskId, { rejectWithValue, getState }) => {
    try {
      const task = getState().tasks.tasks.find((t) => t._id === taskId);
      return await updateTaskStatus(taskId, { important: !task.important });
    } catch (error) {
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch tasks
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

      // Fetch task by ID
      .addCase(fetchTaskByIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTaskByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTask = action.payload;
      })
      .addCase(fetchTaskByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create task
      .addCase(createTaskAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update task
      .addCase(updateTaskAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        const task = state.tasks.find((t) => t._id === action.payload._id);
        if (task) Object.assign(task, action.payload);
      })
      .addCase(updateTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle completion
      .addCase(toggleCompleteAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleCompleteAsync.fulfilled, (state, action) => {
        state.loading = false;
        const task = state.tasks.find((t) => t._id === action.payload._id);
        if (task) task.completed = action.payload.completed;
      })
      .addCase(toggleCompleteAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle important
      .addCase(toggleImportantAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleImportantAsync.fulfilled, (state, action) => {
        state.loading = false;
        const task = state.tasks.find((t) => t._id === action.payload._id);
        if (task) task.important = action.payload.important;
      })
      .addCase(toggleImportantAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete task
      .addCase(deleteTaskAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
