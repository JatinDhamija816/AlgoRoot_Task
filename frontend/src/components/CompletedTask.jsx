import React, { useEffect } from "react";
import { CiStar } from "react-icons/ci";
import { IoMdStar } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import {
  fetchTasksAsync,
  updateTaskStatusAsync,
  deleteTaskAsync,
} from "../redux/slices/taskSlice";

const CompletedTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const completedTasks = tasks.filter((task) => task.completed);

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchTasksAsync());
    }
  }, [dispatch, tasks.length]);

  return (
    <div className="w-full px-4 transition-all duration-300">
      <h1 className="text-lg pb-4">Completed</h1>

      {completedTasks.length === 0 ? (
        <p className="text-center text-gray-500">No completed tasks 🎉</p>
      ) : (
        completedTasks.map((task) => {
          const ImportantIcon = task.important ? IoMdStar : CiStar;

          return (
            <div
              key={task._id}
              className="flex justify-between items-center p-3 gap-3 border-b-2 border-gray-300"
            >
              <div className="flex space-x-3 items-center">
                {/* Task Completion Checkbox */}
                <input
                  type="checkbox"
                  id={`task-${task._id}`}
                  className="accent-green-500 cursor-pointer"
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
                  {/* Task Title */}
                  <label
                    htmlFor={`task-${task._id}`}
                    className="cursor-pointer"
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
                    task.important ? "Unmark as important" : "Mark as important"
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
        })
      )}
    </div>
  );
};

export default CompletedTask;
