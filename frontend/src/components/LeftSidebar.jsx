import React, { useMemo } from "react";
import user from "../assets/user.png";
import { LuClipboardList } from "react-icons/lu";
import { CiCalendar, CiStar, CiMap } from "react-icons/ci";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { PiWarningCircleDuotone } from "react-icons/pi";
import { useSelector } from "react-redux";

const SidebarItem = ({ icon: Icon, label, onClick }) => (
  <div
    className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-green-100 cursor-pointer transition-colors"
    onClick={onClick}
  >
    <Icon className="w-6 h-6 text-gray-700" />
    <p className="text-[15px] text-gray-900">{label}</p>
  </div>
);

const LeftSidebar = () => {
  const isLeftSidebarOpen = useSelector((state) => state.ui.isLeftSidebarOpen);

  // Memoized sidebar items to prevent unnecessary re-renders
  const sidebarItems = useMemo(
    () => [
      { icon: LuClipboardList, label: "All Tasks" },
      { icon: CiCalendar, label: "Today" },
      { icon: CiStar, label: "Important" },
      { icon: CiMap, label: "Planned" },
      { icon: FaChalkboardTeacher, label: "Assigned to me" },
    ],
    []
  );

  return (
    <aside
      className={`bg-[#EEF6EF] pt-14 pb-5 flex-shrink-0 transition-all duration-300 ${
        isLeftSidebarOpen ? "w-1/5" : "w-[80px]"
      }`}
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center relative">
        <img
          src={user}
          alt="User"
          className="w-20 h-20 rounded-full border-4 border-white shadow-md absolute top-[-40px]"
        />
        <p className="mt-16 text-lg font-semibold text-gray-900">Hey, ABCD</p>
      </div>

      {/* Sidebar Items */}
      <div className="bg-white rounded-md mx-3 my-4 p-2 shadow-sm">
        {sidebarItems.map((item, index) => (
          <SidebarItem key={index} icon={item.icon} label={item.label} />
        ))}
      </div>

      {/* Add List Button */}
      <div className="bg-white mx-3 my-3 p-4 flex items-center gap-2 rounded-md shadow-sm cursor-pointer hover:bg-gray-200 transition-all">
        <IoAdd className="w-6 h-6 text-gray-700" />
        <p className="text-[15px] text-gray-900">Add list</p>
      </div>

      {/* Today Tasks */}
      <div className="bg-white mx-3 my-3 p-4 rounded-md shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[15px] font-medium text-gray-900">Today Tasks</p>
          <PiWarningCircleDuotone className="w-6 h-6" />
        </div>
        <p className="text-[21px] font-bold text-gray-900">11</p>
        <hr className="border-t border-gray-200 my-2" />
      </div>
    </aside>
  );
};

export default React.memo(LeftSidebar);
