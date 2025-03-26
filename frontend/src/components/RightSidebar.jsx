import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskAsync,
  updateTaskStatusAsync,
  updateTaskAsync, // Ensure this is imported
} from "../redux/slices/taskSlice";
import { IoMdStar } from "react-icons/io";
import { CiBellOn, CiStar, CiCalendarDate } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toggleRightSidebar } from "../redux/slices/uiSlice";

const RightSidebar = () => {
  const dispatch = useDispatch();
  const isRightSidebarOpen = useSelector(
    (state) => state.ui.isRightSidebarOpen
  );
  const selectedTask = useSelector((state) =>
    state.tasks.tasks.find((task) => task._id === state.ui.selectedTask)
  );

  // State for editable fields
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Populate fields when a task is selected
  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDueDate(selectedTask.dueDate || "");
      setDescription(selectedTask.description || "");
    }
  }, [selectedTask]);

  if (!isRightSidebarOpen || !selectedTask) return null;

  const ImportantIcon = selectedTask.important ? IoMdStar : CiStar;

  // Function to handle task updates
  const handleUpdateTask = () => {
    dispatch(
      updateTaskAsync({
        taskId: selectedTask._id,
        updatedData: { title, dueDate, description },
      })
    );
  };

  return (
    <aside
      className={`bg-[#EEF6EF] shadow-lg rounded-lg p-5 absolute right-0 top-0 h-full transition-all duration-300 ease-in-out md:relative min-h-screen ${
        isRightSidebarOpen ? "w-80 md:w-1/4" : "w-0"
      } overflow-hidden flex flex-col`}
    >
      {/* Task Header */}
      <div className="border-b pb-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {/* Editable Task Title */}
          <input
            type="text"
            className="text-lg bg-transparent focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <ImportantIcon
          className={`w-6 h-6 cursor-pointer ${
            selectedTask.important ? "text-yellow-500" : "text-gray-600"
          }`}
          onClick={() =>
            dispatch(
              updateTaskStatusAsync({
                taskId: selectedTask._id,
                field: "important",
              })
            )
          }
        />
      </div>

      {/* Sidebar Actions */}
      <div className="mt-4 space-y-4 flex-grow">
        {[
          { icon: IoAdd, label: "Add Step" },
          { icon: CiBellOn, label: "Set Reminder" },
          { icon: CiCalendarDate, label: "Add Due Date" },
          { icon: IoAdd, label: "Repeat" },
        ].map(({ icon: Icon, label }, index) => (
          <div key={index} className="flex flex-col">
            <div
              className="flex items-center border-b py-2 space-x-3 cursor-pointer hover:bg-gray-100 transition"
              onClick={() =>
                label === "Add Due Date" && setShowDatePicker((prev) => !prev)
              }
            >
              <Icon className="w-6 h-6 text-gray-700" />
              <p>{label}</p>
            </div>

            {/* Date Picker */}
            {label === "Add Due Date" && showDatePicker && (
              <input
                type="date"
                value={dueDate}
                className="mt-2 p-2 border rounded-md w-full text-gray-900"
                onChange={(e) => setDueDate(e.target.value)}
              />
            )}
          </div>
        ))}

        {/* Description (Using Add Notes Textarea) */}
        <textarea
          placeholder="Add Notes"
          className="outline-none px-2 border-b w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-gray-300 py-3 flex justify-between items-center mt-auto">
        <RxCross1
          className="w-6 h-6 cursor-pointer text-gray-700 hover:text-gray-900"
          onClick={() => {
            dispatch(toggleRightSidebar());
            localStorage.setItem("selectedTask", null);
          }}
        />
        <button
          className="bg-[#35793729] text-[#357937] px-6 py-2 rounded-md cursor-pointer"
          onClick={handleUpdateTask}
        >
          Update Task
        </button>
        <RiDeleteBin6Line
          className="w-6 h-6 cursor-pointer text-red-600 hover:text-red-800"
          onClick={() => {
            dispatch(deleteTaskAsync(selectedTask._id));
            dispatch(toggleRightSidebar());
            localStorage.setItem("selectedTask", null);
          }}
        />
      </div>
    </aside>
  );
};

export default RightSidebar;
