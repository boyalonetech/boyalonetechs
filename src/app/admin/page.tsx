"use client";
import { useState, useEffect } from "react";
import Admin from "@/components/Admin";

const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER;
const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS;

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // popup message

  useEffect(() => {
    const auth = localStorage.getItem("Admin");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem("Admin", "true");
      setIsAuthenticated(true);
      setError(""); // clear any old errors
    } else {
      setError("Invalid username or password ❌");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("Admin");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center z-60 lg:bg-gray-100  relative">
        {/* Login Card */}
        <div className="bg-white p-8 rounded-xl lg:shadow-xl lg:w-[40%]">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
            Admin Login
          </h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-700 text-white py-3 rounded hover:bg-blue-800 transition-colors"
          >
            Login
          </button>
        </div>

        {/* Popup Modal */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-xs bg-black/50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
              <h3 className="text-lg font-semibold text-red-600 mb-4">
                Login Failed
              </h3>
              <p className="text-gray-700 mb-6">{error}</p>
              <button
                onClick={() => setError("")}
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return <Admin onLogout={handleLogout} />;
}
