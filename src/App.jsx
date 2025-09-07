import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

/* Root: routes */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      {/* fallback */}
      <Route path="*" element={<Register />} />
    </Routes>
  );
}

/* Register component */
function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  // If already registered & logged in, go home
  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) navigate("/home");
  }, [navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      alert("Please fill all fields");
      return;
    }

    const user = { name: form.name.trim(), email: form.email.trim(), password: form.password };
    localStorage.setItem("user", JSON.stringify(user)); // save user details
    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md card rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold mb-4 text-center">Create an account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Full name</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="mt-1 block w-full rounded-lg p-3 border focus:border-green-600"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1 block w-full rounded-lg p-3 border focus:border-green-600"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="mt-1 block w-full rounded-lg p-3 border focus:border-green-600"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full bg-[var(--green)] hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

/* Login component */
function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) navigate("/home");
  }, [navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const saved = localStorage.getItem("user");
    if (!saved) {
      setError("No user found. Please register first.");
      return;
    }

    const user = JSON.parse(saved);
    if (form.email === user.email && form.password === user.password) {
      localStorage.setItem("session", JSON.stringify(user)); // create a "session"
      navigate("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md card rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1 block w-full rounded-lg p-3 border focus:border-green-600"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
              className="mt-1 block w-full rounded-lg p-3 border focus:border-green-600"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full bg-[var(--green)] hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

/* Home component */
function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (!session) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(session));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("session"); // delete session
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md card rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-semibold">Welcome, {user.name} 👋</h1>
        <p className="mt-2 text-sm">Email: {user.email}</p>

        <button
          onClick={logout}
          className="mt-6 w-full bg-[var(--green)] hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
