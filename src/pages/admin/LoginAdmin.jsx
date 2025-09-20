import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
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
      const res = await axios.post("https://e-commerce-laravel-api-production.up.railway.app/api/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      if (user.role === "admin") {
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/admin/dashboard");
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

      {/* Content */}
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full flex items-center justify-center bg-indigo-100">
              <img
                src="../images/zz.png"
                alt="Logo"
                className="h-6 w-6 text-indigo-600"
              >
              </img>
            </div>
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
              Admin Login
            </h2>
            {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
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
        </div>
      </main>
    </div>
  );
}
