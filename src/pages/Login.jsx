import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useStore } from "../context";
import toast from "react-hot-toast";

const Login = () => {
  const { login, loading } = useStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  const toggleImageModal = () => {
    setImageModalOpen(!isImageModalOpen);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(formData);

    if (result) {
      navigate("/dashboard");
      toast.success("Logged in succesfull");
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-[95%]  sm:max-w-[400px] relative">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            className="w-24 h-24 rounded-full border-4 border-indigo-500 bg-blue-950 z-10 cursor-pointer"
            src="https://obaidbroimages.netlify.app/obaid.png"
            alt="Profile"
            onClick={toggleImageModal}
          />
        </div>
        {/* Login Form */}
        <h2 className="text-2xl font-bold text-center text-gray-200 mb-4">
          Welcome Back! 👋
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4 relative">
            <label
              htmlFor="email"
              className="block text-gray-400 text-sm font-semibold mb-2"
            >
              Email
            </label>
            <div className="flex items-center border border-gray-600 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent">
              <FaEnvelope size={15} className="text-gray-400 mr-2" />{" "}
              {/* Email Icon */}
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full text-sm text-gray-300 bg-gray-800 focus:outline-none"
                required
                autoComplete="off"
              />
            </div>
          </div>
          {/* Password Field */}
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-gray-400 text-sm font-semibold mb-2"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-600 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent">
              <FaLock size={15} className="text-gray-400 mr-2" />{" "}
              {/* Password Icon */}
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full text-sm text-gray-300 bg-gray-800 focus:outline-none"
                required
              />
              <button
                type="button"
                className="ml-2 text-gray-400 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            {loading ? (
              <span className="text-xs">authenticating...</span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="text-gray-400 text-sm text-center mt-5">
          Visit Portfolio website? 👉{" "}
          <Link
            target="_blank"
            className="underline"
            to="https://obaidbro.netlify.app"
          >
            Click Here
          </Link>
        </p>
      </div>

      {/* Modal for Enlarged Image */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            {/* Enlarged Image */}
            <img
              src="https://obaidbroimages.netlify.app/obaid.png"
              alt="Profile Enlarged"
              className="w-96 h-96 rounded-full"
            />
            {/* Close Icon */}
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold cursor-pointer"
              onClick={toggleImageModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
