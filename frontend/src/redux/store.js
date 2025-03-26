import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice";
import uiReducer from "./slices/uiSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    ui: uiReducer,
  },
});

export default store;
