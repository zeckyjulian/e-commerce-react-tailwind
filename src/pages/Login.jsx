import { useState } from "react";
import { Footer } from "../components/Footer";
import Head from "../components/Head";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      if (user.role === "user") {
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        setError("You do not have permission to access this page.");
      }
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Head */}
      <Head />

      {/* Content */}
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full flex items-center justify-center bg-indigo-100">
              <img
                src="./images/zz.png"
                alt="Logo"
                className="h-6 w-6 text-indigo-600"
              >
              </img>
            </div>
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 
                    placeholder-gray-500 text-gray-900 rounded-md focus:outline-none 
                    focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 
                    placeholder-gray-500 text-gray-900 rounded-md focus:outline-none 
                    focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Sign in button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                  text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">
            <span className="absolute inset-x-0 top-1/2 border-t border-gray-300" />
            <span className="bg-white px-2 text-gray-500 text-sm relative">
              Or continue with
            </span>
          </div>

          {/* Social login */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                alt="GitHub"
                className="w-5 h-5"
              />
              GitHub
            </button>
          </div>

          {/* Register link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register
            </a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
