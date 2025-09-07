import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (!saved) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(saved));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md card rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-semibold">Welcome, {user?.name} 👋</h1>
        <p className="mt-2 text-sm">Email: {user?.email}</p>
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
