import React, { useEffect } from "react";
import { IoMdStar } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { CiStar } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { setSelectedTask, toggleRightSidebar } from "../redux/slices/uiSlice";
import {
  deleteTaskAsync,
  fetchTasksAsync,
  updateTaskStatusAsync,
} from "../redux/slices/taskSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  const gridView = useSelector((state) => state.ui.isGridView);
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchTasksAsync());
    }
  }, [dispatch, tasks.length]); // Fetch only if tasks are empty

  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="w-full p-4 transition-all duration-300">
      {pendingTasks.length === 0 ? (
        <p className="text-center text-gray-500">No pending tasks 🎉</p>
      ) : (
        <div
          className={`${
            gridView
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              : "space-y-3"
          }`}
        >
          {pendingTasks.map((task) => {
            const ImportantIcon = task.important ? IoMdStar : CiStar;

            return (
              <div
                key={task._id}
                className={`flex justify-between items-center p-3 ${
                  gridView
                    ? "border shadow-sm hover:shadow-md rounded-lg break-words whitespace-normal"
                    : "border-b-2 border-gray-300"
                }`}
              >
                <div className="flex space-x-3 items-center">
                  {/* Task Completion Checkbox */}
                  <input
                    type="checkbox"
                    id={`task-${task._id}`}
                    className="cursor-pointer"
                    checked={task.completed}
                    onChange={() =>
                      dispatch(
                        updateTaskStatusAsync({
                          taskId: task._id,
                          field: "completed",
                        })
                      )
                    }
                  />

                  <div>
                    {/* Task Title (Opens Right Sidebar) */}
                    <label
                      htmlFor={`task-${task._id}`}
                      className="cursor-pointer font-medium"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(setSelectedTask(task._id));
                        dispatch(toggleRightSidebar());
                      }}
                    >
                      {task.title}
                    </label>
                    {task.dueDate && (
                      <p className="text-sm text-gray-500">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Task Actions (Important & Delete) */}
                <div className="flex space-x-2 items-center">
                  <ImportantIcon
                    className={`w-6 h-6 cursor-pointer ${
                      task.important ? "text-yellow-500" : "text-gray-700"
                    }`}
                    aria-label={
                      task.important
                        ? "Unmark as important"
                        : "Mark as important"
                    }
                    onClick={() =>
                      dispatch(
                        updateTaskStatusAsync({
                          taskId: task._id,
                          field: "important",
                        })
                      )
                    }
                  />
                  <MdDelete
                    className="w-6 h-6 cursor-pointer text-red-500"
                    onClick={() => dispatch(deleteTaskAsync(task._id))}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TaskList;
