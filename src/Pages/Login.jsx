import { Link, useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";

import { useContext, useState } from "react";

import Swal from "sweetalert2";

import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { signInUser, googleLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const result = await signInUser(email, password);
      await fetch("http://localhost:5000/jwt", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: result.user.email,
        }),
      });
      Swal.fire({
        icon: "success",
        title: "Login Successful",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await googleLogin();
      await fetch("http://localhost:5000/jwt", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: result.user.email,
        }),
      });

      Swal.fire({
        icon: "success",
        title: "Google Login Successful",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex justify-center items-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Welcome Back</h1>

          <p className="text-gray-600">
            Login to continue your pet adoption journey.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
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
            <label className="block mb-2 font-semibold">Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 rounded-xl text-lg font-semibold transition"
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-[1px] bg-gray-300"></div>

          <p className="text-gray-500">OR</p>

          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full border border-gray-300 hover:bg-gray-100 disabled:bg-gray-100 py-3 rounded-xl font-semibold transition flex justify-center items-center gap-3"
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>

        <p className="text-center mt-6 text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-orange-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
