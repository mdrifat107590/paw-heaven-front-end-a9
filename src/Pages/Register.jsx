import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
const Register = () => {
  return (
    <div className="min-h-screen bg-orange-50 flex justify-center items-center px-4 py-16">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Create Account</h1>
          <p className="text-gray-600">
            Join us and help pets find loving homes.
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block mb-2 font-semibold">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Photo URL</label>
            <input
              type="text"
              placeholder="Enter your photo URL"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
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

          {/* Google Register */}
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
