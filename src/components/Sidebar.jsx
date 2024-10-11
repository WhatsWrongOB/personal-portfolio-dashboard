import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import menu from "/menu.svg";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    if (notification) setNotification(false);
    setIsOpen(!isOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {isOpen || (
        <div
          id="menu"
          className="absolute top-[15px] left-[20px] cursor-pointer z-20 md:hidden"
          onClick={toggleSidebar}
        >
          <img className="w-[25px]" src={menu} alt="hamburger menu" />
        </div>
      )}
      <div
        onClick={() => notification && setNotification(false)}
        className="absolute right-[25px] top-[15px] cursor-pointer md:hidden"
      >
        <i
          onClick={() => setNotification(!notification)}
          className="fa-solid fa-bell text-lg"
        ></i>

        <div
          className={`absolute right-0 w-[220px] h-[220px] border border-solid border-gray-600 rounded-lg bg-[#131f38] flex justify-center items-center ${
            notification ? "flex" : "hidden"
          } `}
        >
          <div className="flex items-center gap-2">
            <i className="fa fa-bell-slash text-gray-500"></i>
            <p className="text-sm text-gray-500">No Notification Yet</p>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        onClick={toggleSidebar}
        id="sidebar"
        className={`w-[270px] md:w-[260px] bg-gray-800 text-white h-screen p-3 pl-4 fixed top-0 md:left-0 transition-transform duration-300 ${
          isOpen ? "left-0" : "-left-[270px]"
        } md:left-0 z-10`}
      >
        <h2 className="text-lg md:text-xl font-bold mb-7 mt-4 pr-2 flex items-center gap-2">
          <i className="fa-solid fa-house mr-1"></i>
          Admin Dashboard
        </h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className={`block text-[0.93rem] p-2 rounded hover:bg-gray-600 pl-3 ${
                isActive("/") ? "border-l-[6px] border-[#3f7cd7]" : ""
              }`}
            >
              <i className="fa-solid fa-table-columns mr-3"></i>
              Dashboard Overview
            </Link>
          </li>
          <p className="text-sm text-gray-400">Management</p>
          <li>
            <Link
              to="/projects"
              className={`block text-[0.93rem] p-2 rounded hover:bg-gray-600 pl-3 ${
                isActive("/projects")
                  ? "border-l-[6px] border-[#3f7cd7]"
                  : ""
              }`}
            >
              <i className="fa-solid fa-people-roof mr-3"></i>
              Manage Pers. Projects
            </Link>
          </li>
          <li>
            <Link
              to="/skills"
              className={`block text-[0.93rem] p-2 rounded hover:bg-gray-600 pl-3 ${
                isActive("/skills") ? "border-l-[6px] border-[#3f7cd7]" : ""
              }`}
            >
              <i className="fa-solid fa-user mr-2"></i>
              Manage Technical Skills
            </Link>
          </li>
          <p className="text-sm text-gray-400">Analytics</p>
          <li>
            <Link
              to="/report"
              className={`block text-[0.93rem] p-2 rounded hover:bg-gray-600 pl-3 ${
                isActive("/report") ? "border-l-[6px] border-[#3f7cd7]" : ""
              }`}
            >
              <i className="fa-solid fa-flag mr-3"></i>
              Suggestion & Feedback
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={`block text-[0.93rem] p-2 rounded hover:bg-gray-600 pl-3 ${
                isActive("/settings") ? "border-l-[6px] border-[#3f7cd7]" : ""
              }`}
            >
              <i className="fa-solid fa-gear mr-3"></i>
              Settings
            </Link>
          </li>
          <li>
            <Link
              to="/logout"
              className={`block text-[0.93rem] p-2 rounded hover:bg-gray-600 pl-3 ${
                isActive("/logout") ? "border-l-[6px] border-[#3f7cd7]" : ""
              }`}
            >
              <i className="fa-solid fa-right-from-bracket mr-3"></i>
              Logout
            </Link>
          </li>
        </ul>

        {isOpen && (
          <button
            onClick={toggleSidebar}
            className="md:hidden absolute left-[277px] top-[10px] z-10  px-[0.4rem] cursor-pointer hover:bg-gray-700 rounded-full"
          >
            <i className="fa-solid fa-close"></i>
          </button>
        )}
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black md:hidden opacity-50 z-5"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
