import { createSlice } from "@reduxjs/toolkit";

const loadState = (key, defaultValue) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.warn(
      `Failed to load ${key} from localStorage. Resetting to default.`
    );
    console.error(error);
    localStorage.removeItem(key);
    return defaultValue;
  }
};

const saveState = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

const initialState = {
  isLeftSidebarOpen: loadState("leftSidebar", false),
  isRightSidebarOpen: loadState("rightSidebar", false),
  isGridView: loadState("isGridView", true),
  selectedTask: loadState("selectedTask", null),
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleLeftSidebar: (state) => {
      state.isLeftSidebarOpen = !state.isLeftSidebarOpen;
      persistUiState(state);
    },
    toggleRightSidebar: (state) => {
      state.isRightSidebarOpen = !state.isRightSidebarOpen;
      persistUiState(state);
    },
    toggleGridView: (state) => {
      state.isGridView = !state.isGridView;
      persistUiState(state);
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
      persistUiState(state);
    },
  },
});

export const persistUiState = (state) => {
  saveState("leftSidebar", state.isLeftSidebarOpen);
  saveState("rightSidebar", state.isRightSidebarOpen);
  saveState("isGridView", state.isGridView);
  saveState("selectedTask", state.selectedTask);
};

export const {
  toggleLeftSidebar,
  toggleRightSidebar,
  toggleGridView,
  setSelectedTask,
} = uiSlice.actions;
export default uiSlice.reducer;
