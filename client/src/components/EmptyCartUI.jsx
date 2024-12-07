import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyCartUI = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-4 py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ShoppingCart className="h-24 w-24 text-gray-300" />
      <h3 className="text-2xl font-semibold"> Your Cart is empty</h3>
      <p className="text-gray-400">
        Looks like your {"haven't"} added anything to your cart yet
      </p>
      <Link
        to="/"
        className="mt-4 rounded-md bg-emarlad-500 px-6 text-white py-2 transition-colors hover:text-[#ead457] hover:tracking-widest hover:duration-300"
      >
        Start Shopping
      </Link>
    </motion.div>
  );
};

export default EmptyCartUI;
