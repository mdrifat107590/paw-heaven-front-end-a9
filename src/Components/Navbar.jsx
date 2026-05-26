import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/all-pets">All Pets</NavLink>
      </li>

      <li>
        <NavLink to="/dashboard/my-requests">
          My Requests
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard/add-pet">
          Add Pet
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
              alt="logo"
              className="w-10 h-10"
            />

            <h2 className="text-2xl font-bold text-orange-500">
              PetHeaven
            </h2>
          </Link>

          <ul className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
            {links}
          </ul>
          <div className="hidden lg:block">
            <Link
              to="/login"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition"
            >
              Login
            </Link>
          </div>

          <div className="relative lg:hidden">

            <button
              onClick={() => setOpen(!open)}
              className="cursor-pointer"
            >
              <HiMenuAlt3 size={30} />
            </button>
            {open && (
              <ul className="absolute right-0 mt-4 w-52 bg-white shadow-lg rounded-lg p-4 space-y-3 z-50">

                {links}

                <Link
                  to="/login"
                  className="block bg-orange-500 text-white text-center py-2 rounded-lg"
                >
                  Login
                </Link>

              </ul>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;