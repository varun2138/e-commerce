import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  LogIn,
  LockKeyholeIcon,
  LucideLoader,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, loading } = useUserStore();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(formData);
  };
  return (
    <div className="flex flex-col justify-center py-6 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-center text-2xl sm:text-3xl font-semibold text-stone-300 font-sans tracking-wider ">
          Login to your account
        </h1>
      </motion.div>

      <motion.div
        className="mt-6 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="sm:border sm:border-gray-800   py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400"
              >
                email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-teal-300" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  // value={email}
                  onChange={handleChange}
                  // onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full px-3 py-1 pl-10 bg-gray-950 border border-gray-600 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 "
                  placeholder="enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400"
              >
                password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockKeyholeIcon
                    className="h-5 w-5 text-teal-300"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  // value={password}
                  onChange={handleChange}
                  // onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full px-3 py-1 pl-10 bg-gray-950 border border-gray-600 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 "
                  placeholder="enter your password"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.85 }}
              className="cursor-pointer disabled:opacity-50 flex justify-center items-center gap-2 bg-green-600  py-1 w-full  sm:mx-auto rounded-xl tracking-wider hover:bg-green-700"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2">
                  <LucideLoader
                    className="m-2 h-5 w-5 animate-spin"
                    aria-hidden="true"
                  />
                  Loading...
                </div>
              ) : (
                <div className="flex justify-center items-center gap-2">
                  <LogIn size={18} />
                  Login
                </div>
              )}
            </motion.button>
          </form>
        </div>
        <div className="sm:mt-4 mx-6 sm:mx-0">
          <p className="flex items-center gap-3  ">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="tracking-wider font-bold flex justify-center items-center gap-2 text-green-600"
            >
              Signup here <ArrowRight size={20} />{" "}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
