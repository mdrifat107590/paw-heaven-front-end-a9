import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-orange-500 text-white px-8 py-4">

      <div className="flex justify-between items-center">

        <Link to="/" className="text-2xl font-bold">
          PetAdopt
        </Link>

        <div className="flex gap-6">

          <Link to="/">Home</Link>

          <Link to="/all-pets">
            All Pets
          </Link>

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Navbar;