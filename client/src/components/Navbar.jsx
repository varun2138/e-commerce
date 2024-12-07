import React from "react";
import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  HomeIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();
  return (
    <header className="fixed top-0 left-0 w-full  bg-opacity-90 backdrop-blur-md shadow-lg z-40 py-4">
      <div className="container mx-auto px-4 py-3 flex justify-between">
        <Link
          to="/"
          className="  sm:text-2xl font-bold text-[#fffadc] items-center space-x-2 flex"
        >
          E-Commerce
        </Link>
        <nav className=" flex flex-wrap items-center gap-4 sm:pr-12 ">
          <Link
            to="/"
            className="text-gray-300 hover:text-cyan-300 transition duration-300 ease-in-out items-center flex gap-1 "
          >
            <HomeIcon size={20} />
            <span className="hidden sm:inline">Home</span>
          </Link>
          {user && (
            <Link
              to="/cart"
              className="relative group text-gray-300 hover:text-cyan-300 transition duration-300 ease-in-out items-center flex gap-1 "
            >
              <ShoppingCart className="inline-block mr-1 group-hover:text-cyan-300 " />
              <span className="hidden sm:inline">cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-4 -left-2  bg-emerald-500 text-white rounded-full px-2 py-1 text-xs group-hover:bg-enarald-400 transition duration-300 ease-in-out">
                  {cart.length}
                </span>
              )}
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/secret-dashboard"
              className="hover:text-cyan-300 sm:hover:text-white sm:hover:bg-green-800 flex items-center gap-1 sm:bg-green-700 sm:px-3 py-1 rounded-md text-gray-200  "
            >
              <Lock size={20} />
              <span className="hidden sm:inline">dashboard</span>
            </Link>
          )}
          {user ? (
            <button
              onClick={logout}
              className="sm:bg-gray-800 sm:hover:bg-gray-900 hover:text-cyan-300 sm:hover:text-white text-white py-2 sm:px-4 rounded-md flex items-center gap-1 transition duration-300 ease-in-out"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">log out</span>
            </button>
          ) : (
            <div className="flex items-center sm:gap-3">
              <Link
                to="/signup"
                className="hover:text-cyan-300 sm:hover:text-white sm:hover:bg-gray-800 flex items-center gap-2 sm:bg-gradient-to-r sm:from-[#000000]  sm:to-[#091540] px-3 py-1.5 rounded-md text-gray-200  "
              >
                <UserPlus size={20} />
                <span className="hidden sm:inline ">signup</span>
              </Link>
              <Link
                to="/login"
                className="hover:text-cyan-300 sm:hover:text-white sm:hover:bg-gray-800 flex items-center gap-2 sm:bg-gradient-to-r sm:from-[#0f172a]  sm:to-[#0a0f16] px-3 py-1.5 rounded-md text-gray-200  "
              >
                <LogIn size={20} />
                <span className="hidden sm:inline ">login</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
