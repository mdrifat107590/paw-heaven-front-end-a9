import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          <div>
            <Link to="/" className="flex items-center gap-2 mb-5">
              <img
                src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
                alt="logo"
                className="w-10 h-10"
              />

              <h2 className="text-3xl font-bold text-orange-500">PetHeaven</h2>
            </Link>

            <p className="text-gray-400 leading-7">
              Helping loving families connect with pets waiting for a forever
              home.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-5">Quick Links</h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/" className="hover:text-orange-500 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/all-pets"
                  className="hover:text-orange-500 transition"
                >
                  All Pets
                </Link>
              </li>

              <li>
                <Link to="/login" className="hover:text-orange-500 transition">
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="hover:text-orange-500 transition"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-5">Contact Info</h3>

            <div className="space-y-3 text-gray-400">
              <p>📍 Dhaka, Bangladesh</p>

              <p>📞 +880 1234-567890</p>

              <p>✉️ support@PetHeaven.com</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-5">Follow Us</h3>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-5 text-center text-gray-400">
          <p>© 2026 PetHeaven. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
