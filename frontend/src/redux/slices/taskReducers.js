import {
  createTaskAsync,
  deleteTaskAsync,
  fetchTaskByIdAsync,
  fetchTasksAsync,
  updateTaskAsync,
  updateTaskStatusAsync,
} from "./taskActions";

const taskReducers = (builder) => {
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
      const index = state.tasks.findIndex((t) => t._id === action.payload._id);
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
};

export default taskReducers;
