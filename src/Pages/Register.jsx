import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Password must be at least 6 characters",
      });

      return;
    }

    if (!/[A-Z]/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Password must contain one uppercase letter",
      });

      return;
    }

    if (!/[a-z]/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Password must contain one lowercase letter",
      });

      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
      });

      return;
    }



    createUser(email, password)
      .then((result) => {
        updateUser({
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Registration Successful",
            });

            navigate("/");
          })

          .catch((error) => {
            console.log(error);
          });

        console.log(result.user);
      })

      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen bg-orange-50 flex justify-center items-center px-4 py-16">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Create Account</h1>

          <p className="text-gray-600">
            Join us and help pets find loving homes.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <label className="block mb-2 font-semibold">Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Photo URL</label>

            <input
              type="text"
              name="photo"
              placeholder="Enter your photo URL"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-lg font-semibold transition"
          >
            Register
          </button>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-[1px] bg-gray-300"></div>

            <p className="text-gray-500">OR</p>

            <div className="flex-1 h-[1px] bg-gray-300"></div>
          </div>

          <button
            type="button"
            className="w-full border border-gray-300 hover:bg-gray-100 py-3 rounded-xl font-semibold transition flex justify-center items-center gap-3"
          >
            <FcGoogle size={24} />
            Continue with Google
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
