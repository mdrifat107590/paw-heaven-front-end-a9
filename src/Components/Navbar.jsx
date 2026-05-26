import { Link, NavLink } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logout Successful",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeMenu = () => setIsOpen(false);

  const links = (
    <>
      <li>
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-pets" onClick={closeMenu}>
          All Pets
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard/my-requests" onClick={closeMenu}>
          My Requests
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/add-pet" onClick={closeMenu}>
          Add Pet
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
              alt="logo"
              className="w-10 h-10"
            />
            <h2 className="text-2xl font-bold text-orange-500">PetHeaven</h2>
          </Link>

          <ul className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
            {links}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <>
                <img
                  src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="user"
                  className="w-12 h-12 rounded-full border-2 border-orange-500 object-cover"
                />
                <button
                  onClick={handleLogout}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition"
              >
                Login
              </Link>
            )}
          </div>

          <div className="relative lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer focus:outline-none z-50 block"
            >
              {isOpen ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-4 w-56 bg-white shadow-lg rounded-lg p-4 z-50">
                {user && (
                  <div className="flex flex-col items-center border-b pb-4 mb-4">
                    <img
                      src={
                        user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt="user"
                      className="w-16 h-16 rounded-full border-2 border-orange-500 object-cover"
                    />
                    <h3 className="mt-3 font-semibold text-gray-800">
                      {user?.displayName || "User"}
                    </h3>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                )}

                <ul className="space-y-3 text-gray-700 font-medium">{links}</ul>

                <div className="mt-4">
                  {user ? (
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMenu();
                      }}
                      className="w-full bg-orange-500 text-white py-2 rounded-lg"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="block bg-orange-500 text-white text-center py-2 rounded-lg"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
