import { Outlet, NavLink, Link } from "react-router-dom";
import { HiMenuAlt3, HiX, HiHome } from "react-icons/hi";
import { FaPaw, FaClipboardList } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const sidebarLinks = (
    <>
      <NavLink
        to="/"
        onClick={closeSidebar}
        className="flex items-center gap-3 hover:bg-orange-600 px-4 py-3 rounded-xl transition"
      >
        <HiHome size={22} />
        Home
      </NavLink>

      <NavLink
        to="/dashboard/add-pet"
        onClick={closeSidebar}
        className="flex items-center gap-3 hover:bg-orange-600 px-4 py-3 rounded-xl transition"
      >
        <FaPaw size={18} />
        Add Pet
      </NavLink>

      <NavLink
        to="/dashboard/my-listings"
        onClick={closeSidebar}
        className="flex items-center gap-3 hover:bg-orange-600 px-4 py-3 rounded-xl transition"
      >
        <FaClipboardList size={18} />
        My Listings
      </NavLink>

      <NavLink
        to="/dashboard/my-requests"
        onClick={closeSidebar}
        className="flex items-center gap-3 hover:bg-orange-600 px-4 py-3 rounded-xl transition"
      >
        <FaClipboardList size={18} />
        My Requests
      </NavLink>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        ></div>
      )}

      <div
        className={`
          fixed lg:static top-0 left-0 z-50
          w-72 min-h-screen bg-orange-500 text-white p-6
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex justify-end lg:hidden mb-4">
          <button onClick={() => setIsOpen(false)}>
            <HiX size={30} />
          </button>
        </div>

        <Link to="/" className="flex items-center gap-3 mb-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
            alt="logo"
            className="w-12 h-12"
          />
          <h2 className="text-3xl font-bold">Dashboard</h2>
        </Link>

        <div className="bg-orange-600 rounded-2xl p-5 mb-8 text-center">
          <img
            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="user"
            className="w-20 h-20 rounded-full mx-auto border-4 border-white object-cover"
          />
          <h3 className="mt-4 text-xl font-bold">
            {user?.displayName || "User"}
          </h3>
          <p className="text-sm mt-1 break-all">{user?.email}</p>
        </div>

        <div className="flex flex-col gap-3 font-medium">{sidebarLinks}</div>
      </div>

      <div className="flex-1">
        <div className="lg:hidden bg-white shadow px-4 py-4 flex items-center justify-between">
          <button onClick={() => setIsOpen(true)}>
            <HiMenuAlt3 size={30} />
          </button>
          <h2 className="text-2xl font-bold text-orange-500">Dashboard</h2>
          <img
            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="user"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>

        <div className="p-5 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
