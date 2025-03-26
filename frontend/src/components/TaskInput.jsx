import React, { useState } from "react";
import { CiBellOn } from "react-icons/ci";
import { IoRepeatOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { createTaskAsync } from "../redux/slices/taskSlice";

const TaskInput = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    title: "",
    dueDate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.title || !task.dueDate) {
      alert("Please enter task title and due date.");
      return;
    }

    const newTask = {
      title: task.title,
      dueDate: task.dueDate,
      completed: false,
      important: false,
    };

    dispatch(createTaskAsync(newTask));

    setTask({ title: "", dueDate: "" });
  };

  return (
    <div className={`w-full p-4 transition-all duration-300`}>
      <p className="text-[13px] text-[#142E159E]">To Do </p>
      <div className={` bg-[#FBFDFC] pb-5 px-5 `}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Add A Task"
            className=" w-full px-[20px] py-[42px] outline-none "
            value={task.title}
            onChange={(e) =>
              setTask({ ...task, [e.target.name]: e.target.value })
            }
          />
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <CiBellOn className="w-6 h-6 text-gray-700 cursor-pointer" />
              <IoRepeatOutline className="w-6 h-6 text-gray-700 cursor-pointer" />

              <input
                type="date"
                className="text-gray-700 cursor-pointer"
                name="dueDate"
                value={task.dueDate}
                onChange={(e) =>
                  setTask({ ...task, [e.target.name]: e.target.value })
                }
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-[#35793729] text-[#357937] px-6 py-2 rounded-md cursor-pointer"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
