import { Link, NavLink } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });

      await logOut();
      Swal.fire({
        icon: "success",
        title: "Logout Successful",
      });

      setProfileOpen(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    }
  };

  const closeMenu = () => setIsOpen(false);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive
              ? "text-orange-500 font-semibold"
              : "hover:text-orange-500 transition"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/all-pets"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive
              ? "text-orange-500 font-semibold"
              : "hover:text-orange-500 transition"
          }
        >
          All Pets
        </NavLink>
      </li>

        <>
          <li>
            <NavLink
              to="/dashboard/my-requests"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-semibold"
                  : "hover:text-orange-500 transition"
              }
            >
              My Requests
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/add-pet"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-semibold"
                  : "hover:text-orange-500 transition"
              }
            >
              Add Pet
            </NavLink>
          </li>
        </>
    </>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
              alt="logo"
              className="w-10 h-10"
            />

            <h2 className="text-2xl font-bold text-orange-500">PetHeaven</h2>
          </Link>

          <ul className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
            {links}
          </ul>

          <div className="hidden lg:flex items-center gap-4 relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="focus:outline-none"
                >
                  <img
                    src={
                      user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt="user"
                    className="w-12 h-12 rounded-full border-2 border-orange-500 object-cover"
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-4 w-64 bg-white shadow-xl rounded-2xl overflow-hidden z-50">
                    <div className="p-5 border-b">
                      <div className="flex flex-col items-center">
                        <img
                          src={
                            user?.photoURL ||
                            "https://i.ibb.co/4pDNDk1/avatar.png"
                          }
                          alt="user"
                          className="w-16 h-16 rounded-full border-2 border-orange-500 object-cover mb-3"
                        />

                        <h3 className="font-bold text-gray-800">
                          {user?.displayName || "User"}
                        </h3>

                        <p className="text-sm text-gray-500 text-center">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 space-y-2">
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-orange-50 transition text-gray-700"
                      >
                        <FaUserCircle />
                        Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 transition"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition"
              >
                Login
              </Link>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-5">
            {user && (
              <div className="flex flex-col items-center border-b pb-5 mb-5">
                <img
                  src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="user"
                  className="w-20 h-20 rounded-full border-2 border-orange-500 object-cover"
                />

                <h3 className="mt-3 font-bold text-gray-800">
                  {user?.displayName || "User"}
                </h3>

                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            )}

            <ul className="space-y-4 text-gray-700 font-medium flex flex-col">
              {links}
            </ul>

            <div className="mt-6">
              {user ? (
                <div className="space-y-3">
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="block text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();

                      closeMenu();
                    }}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="block text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
