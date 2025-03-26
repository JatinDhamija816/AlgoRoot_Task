import React, { useCallback } from "react";
import { FaBars } from "react-icons/fa";
import { CiSearch, CiGrid41 } from "react-icons/ci";
import { RiMoonClearLine } from "react-icons/ri";
import { IoListOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleGridView, toggleLeftSidebar } from "../redux/slices/uiSlice";
import logo from "../assets/logo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const gridView = useSelector((state) => state.ui.isGridView);

  const handleSidebarToggle = useCallback(() => {
    dispatch(toggleLeftSidebar());
  }, [dispatch]);

  const handleGridToggle = useCallback(() => {
    dispatch(toggleGridView());
  }, [dispatch]);

  const buttonClass =
    "w-6 h-6 flex items-center justify-center cursor-pointer text-xl";

  return (
    <nav className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <button className={buttonClass} onClick={handleSidebarToggle}>
          <FaBars />
        </button>
        <img src={logo} alt="Task Manager Logo" className="h-8 w-[90px]" />
      </div>

      <div className="flex gap-4">
        <button className={buttonClass} aria-label="Search">
          <CiSearch />
        </button>
        <button className={buttonClass} onClick={handleGridToggle}>
          {gridView ? <IoListOutline /> : <CiGrid41 />}
        </button>
        <button className={buttonClass}>
          <RiMoonClearLine />
        </button>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
