import React from "react";
import { Link } from "react-router-dom";

const SideBar = ({ active }) => {
  return (
    <div className="h-0 sm:h-full bg-slate-800 text-white">
      <SideHeader />
      <SideChild active={active} />
    </div>
  );
};

const SideHeader = () => {
  return (
    <div className="p-4 text-white text-lg border-b border-slate-600 flex items-center">
      Header
    </div>
  );
};

const SideChild = ({ active }) => {
  return (
    <div
      className={`${
        active ? "h-[calc(100vh-142px)]" : "h-[calc(100vh-62px)]"
      } overflow-y-auto`}
    >
      <ul>
        <li className="p-3 border-b border-slate-600">
          <Link to="/" className="hover:text-green-500">
            Dashboad
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
