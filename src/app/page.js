"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (endpoint) => {
    const res = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.message == true) {
      window.location.href = '/components/user-details'
    }
    setMessage(data.message);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold">Login/Register</h1>

      <div className="w-full max-w-sm mt-6 bg-white p-4 rounded shadow">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border mb-4 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border mb-4 rounded"
        />

        <div className="flex gap-4">
          <button
            onClick={() => handleSubmit("register")}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Register
          </button>
          <button
            onClick={() => handleSubmit("login")}
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            Login
          </button>
        </div>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
}
