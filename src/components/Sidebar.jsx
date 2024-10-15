import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import menu from "/menu.svg";
import { useStore } from "../context";
import toast from "react-hot-toast";

const Sidebar = () => {
  const {
    notificationMessage,
    setNotificationMessage,
    unreadCount,
    setUnreadCount,
  } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    if (notification) {
      setNotification(false);
      setUnreadCount(0);
    }
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
          onClick={() => {
            setNotification(!notification);
            if (!notification) setUnreadCount(0);
          }}
          className="fa-solid fa-bell text-lg"
        ></i>

        {unreadCount > 0 && (
          <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white text-xs rounded-full px-2">
            {unreadCount}
          </span>
        )}

        <div
          className={`absolute right-0 w-[220px] h-[220px] border border-solid border-gray-600 rounded-lg bg-[#131f38] flex justify-center ${
            notificationMessage.length === 0
              ? "items-center justify-center"
              : ""
          } ${notification ? "flex" : "hidden"} `}
        >
          {notificationMessage.length === 0 ? (
            <div className="flex items-center gap-2">
              <i className="fa fa-bell-slash text-gray-500"></i>
              <p className="text-sm text-gray-500">No Notification Yet</p>
            </div>
          ) : (
            <div id="overflow" className="overflow-y-auto w-full">
              <p
                onClick={() => setNotificationMessage([])}
                className="text-[0.7rem] text-right pr-5 py-1 border border-[#131f38] border-b-gray-700 sticky top-0"
              >
                clear all
              </p>
              {notificationMessage?.reverse().map((item, i) => (
                <p
                  key={i}
                  className="text-xs p-2 border border-[#131f38] border-b-gray-700"
                >
                  {item}
                </p>
              ))}
            </div>
          )}
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
              to="/dashboard"
              className={`block text-[0.93rem] p-2 rounded hover:bg-gray-600 pl-3 ${
                isActive("/dashboard") ? "border-l-[6px] border-[#3f7cd7]" : ""
              }`}
            >
              <i className="fa-solid fa-table-columns mr-3"></i>
              Dashboard Overview
            </Link>
          </li>
          <p className="text-sm text-gray-400">Management</p>
          <li>
            <Link
              to="/dashboard/projects"
              className={`block text-[0.93rem] p-2 rounded hover:bg-gray-600 pl-3 ${
                isActive("/dashboard/projects")
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
              to="/dashboard/skills"
              className={`block text-[0.93rem] p-2 rounded hover:bg-gray-600 pl-3 ${
                isActive("/dashboard/skills")
                  ? "border-l-[6px] border-[#3f7cd7]"
                  : ""
              }`}
            >
              <i className="fa-solid fa-user mr-2"></i>
              Manage Technical Skills
            </Link>
          </li>
          <p className="text-sm text-gray-400">Analytics</p>
          <li>
            <Link
              to="/dashboard/report"
              className={`block text-[0.93rem] p-2 rounded hover:bg-gray-600 pl-3 ${
                isActive("/dashboard/report")
                  ? "border-l-[6px] border-[#3f7cd7]"
                  : ""
              }`}
            >
              <i className="fa-solid fa-flag mr-3"></i>
              Suggestion & Feedback
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className={`block text-[0.93rem] p-2 rounded hover:bg-gray-600 pl-3 ${
                isActive("/dashboard")
                  ? "border-l-[6px] border-[#3f7cd7]"
                  : ""
              }`}
            >
              <i className="fa-solid fa-gear mr-3"></i>
              Settings
            </Link>
          </li>
          <li>
            <div
              className="block text-[0.93rem] p-2 rounded hover:bg-gray-600 pl-3"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
                toast.success("logged out successful");
              }}
            >
              <i className="fa-solid fa-right-from-bracket mr-3"></i>
              Logout
            </div>
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
