import React, { useCallback } from "react";
import { FaBars } from "react-icons/fa";
import { CiSearch, CiGrid41 } from "react-icons/ci";
import { RiMoonClearLine } from "react-icons/ri";
import { IoListOutline } from "react-icons/io5";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { toggleGridView, toggleLeftSidebar } from "../redux/slices/uiSlice";

const selectUIState = createSelector(
  (state) => state.ui,
  (ui) => ui.isGridView
);

const Navbar = () => {
  const dispatch = useDispatch();
  const gridView = useSelector(selectUIState);

  const handleSidebarToggle = useCallback(
    () => dispatch(toggleLeftSidebar()),
    [dispatch]
  );
  const handleGridToggle = useCallback(
    () => dispatch(toggleGridView()),
    [dispatch]
  );

  return (
    <nav className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <button
          className="w-6 h-6 flex items-center justify-center cursor-pointer"
          onClick={handleSidebarToggle}
        >
          <FaBars className="text-xl" />
        </button>
        <img src={logo} alt="logo" className="h-8 w-[90px]" />
      </div>

      <div className="flex gap-4">
        <button className="w-6 h-6 flex items-center justify-center cursor-pointer">
          <CiSearch className="text-xl" />
        </button>
        <button
          className="w-6 h-6 flex items-center justify-center cursor-pointer"
          onClick={handleGridToggle}
        >
          {gridView ? (
            <IoListOutline className="text-xl" />
          ) : (
            <CiGrid41 className="text-xl" />
          )}
        </button>
        <button className="w-6 h-6 flex items-center justify-center cursor-pointer">
          <RiMoonClearLine className="text-xl" />
        </button>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
