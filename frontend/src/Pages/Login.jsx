import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://sustanibilty-dashboard-oren.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log(response.data.token);
      localStorage.setItem("orenToken", response.data.token);
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center w-full max-w-6xl lg:gap-12 gap-6">
        <div className="text-center lg:text-left lg:w-1/2 mt-5">
          <h1 className="text-3xl lg:text-4xl font-bold text-blue-700 mb-4">
            Welcome to Oren Sustainability Dashboard
          </h1>
          <p className="text-lg lg:text-xl text-gray-700">
            Oren is a leader in environmental sustainability, committed to
            providing cutting-edge solutions for a greener future. Our project,
            the "Sustainability Dashboard," helps businesses track and improve
            their environmental impact through data-driven insights.
          </p>
          <p className="mt-4 text-gray-600 italic">
            Join us in our mission to make the world a cleaner and more
            sustainable place.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm sm:max-w-md lg:w-1/3"
        >
          <h1 className="text-2xl font-semibold mb-4 text-center text-blue-600">
            Login to your Account
          </h1>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 mt-1 border rounded"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 mt-1 border rounded"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
