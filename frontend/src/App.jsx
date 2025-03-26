import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import Navbar from "./components/Navbar";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import CompletedTask from "./components/CompletedTask";

const LeftSidebar = lazy(() => import("./components/LeftSidebar"));
const RightSidebar = lazy(() => import("./components/RightSidebar"));

const selectUIState = createSelector(
  (state) => state.ui,
  (ui) => ({
    isLeftSidebarOpen: ui.isLeftSidebarOpen,
    isRightSidebarOpen: ui.isRightSidebarOpen,
  })
);

const App = () => {
  const { isLeftSidebarOpen, isRightSidebarOpen } = useSelector(selectUIState);

  return (
    <div className="md:mx-10 mx-2">
      <Navbar />
      <div className="flex relative">
        <Suspense fallback={<div>Loading...</div>}>
          {isLeftSidebarOpen && <LeftSidebar />}
        </Suspense>

        <div className="flex-1">
          <TaskInput />
          <TaskList />
          <CompletedTask />
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          {isRightSidebarOpen && <RightSidebar />}
        </Suspense>
      </div>
    </div>
  );
};

export default React.memo(App);
