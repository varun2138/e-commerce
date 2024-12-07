import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { set } from "mongoose";
const categories = [
  "jeans",
  "shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
  "bags",
];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const { createProduct, loading } = useProductStore();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewProduct((prevValue) => ({
      ...prevValue,
      [id]: value,
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    } catch (error) {
      console.log("error while creating the product");
    }
  };
  return (
    <motion.div
      className=" shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-[#fffadc]">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            className="mt-1 block w-full bg-black border border-gray-600 rounded-md shadow-sm py-2
           px-3 text-white focus:outline-none focus:ring-2
          focus:ring-[#fffadc]
           focus:border-[#fffadc]"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full bg-black border border-gray-600 rounded-md shadow-sm
           py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#fffadc]
           focus:border-[#fffadc]"
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-300"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            step="0.01"
            className="mt-1 block w-full bg-black border border-gray-600 rounded-md shadow-sm 
          py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#fffadc]
           focus:border-[#fffadc]"
            required
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-300"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            className="mt-1 block w-full bg-black border border-gray-600 rounded-md
           shadow-sm py-2 px-3 text-white focus:outline-none 
           focus:ring-2  focus:ring-[#fffadc]
           focus:border-[#fffadc]"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-1 flex items-center">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className=" hover:text-green-400 transition-colors duration-200 :cursor-pointer bg-black py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Image
          </label>
          {newProduct.image && (
            <span className="ml-3 text-sm text-gray-400">Image uploaded </span>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.85 }}
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
        shadow-sm text-sm font-medium text-black bg-[#fffadc] hover:bg-[#f5ebb1] 
         disabled:opacity-50 transition-colors duration-300"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader
                className="mr-2 h-5 w-5 animate-spin"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Product
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
