import { createSlice } from "@reduxjs/toolkit";
import taskReducers from "./taskReducers";
import {
  createTaskAsync,
  fetchTasksAsync,
  fetchTaskByIdAsync,
  updateTaskAsync,
  updateTaskStatusAsync,
  deleteTaskAsync,
} from "./taskActions";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  selectedTask: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: taskReducers,
});

export {
  createTaskAsync,
  fetchTasksAsync,
  fetchTaskByIdAsync,
  updateTaskAsync,
  updateTaskStatusAsync,
  deleteTaskAsync,
};
export default taskSlice.reducer;
