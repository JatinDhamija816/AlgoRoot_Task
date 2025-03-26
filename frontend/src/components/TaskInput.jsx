import React, { useState } from "react";
import { CiBellOn } from "react-icons/ci";
import { IoRepeatOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { createTaskAsync } from "../redux/slices/taskSlice";

const TaskInput = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({ title: "", dueDate: "" });
  const [error, setError] = useState(""); // State for error message

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.title.trim() || !task.dueDate) {
      setError("Please enter both task title and due date.");
      return;
    }

    dispatch(
      createTaskAsync({ title: task.title.trim(), dueDate: task.dueDate })
    );
    setTask({ title: "", dueDate: "" });
  };

  return (
    <div className="w-full p-4 transition-all duration-300">
      <p className="text-[13px] text-[#142E159E]">To Do</p>
      <div className="bg-[#FBFDFC] pb-5 px-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Add A Task"
            className="w-full px-[20px] py-[42px] outline-none"
            value={task.title}
            onChange={handleChange}
            autoFocus
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}{" "}
          {/* Inline error message */}
          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-2">
              <CiBellOn className="w-6 h-6 text-gray-700 cursor-pointer" />
              <IoRepeatOutline className="w-6 h-6 text-gray-700 cursor-pointer" />
              <input
                type="date"
                className="text-gray-700 cursor-pointer"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              disabled={!task.title.trim() || !task.dueDate}
              className={`px-6 py-2 rounded-md cursor-pointer ${
                !task.title.trim() || !task.dueDate
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#35793729] text-[#357937] hover:bg-[#35793740]"
              }`}
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskInput;
