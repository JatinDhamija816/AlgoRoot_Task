import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import CompletedTask from "./components/CompletedTask";

const LeftSidebar = lazy(() => import("./components/LeftSidebar"));
const RightSidebar = lazy(() => import("./components/RightSidebar"));

const App = () => {
  const isLeftSidebarOpen = useSelector((state) => state.ui.isLeftSidebarOpen);
  const isRightSidebarOpen = useSelector(
    (state) => state.ui.isRightSidebarOpen
  );

  return (
    <div className="md:mx-10 mx-2">
      <Navbar />

      <div className="flex relative">
        <Suspense
          fallback={<div className="text-center py-4">Loading sidebars...</div>}
        >
          {isLeftSidebarOpen && <LeftSidebar />}
          <main className="flex-1 p-4">
            <TaskInput />
            <TaskList />
            <CompletedTask />
          </main>
          {isRightSidebarOpen && <RightSidebar />}
        </Suspense>
      </div>
    </div>
  );
};

export default React.memo(App);
