import React from "react";
import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
const ProductsList = () => {
  const { toggleFeaturedProduct, deleteProduct, products } = useProductStore();

  return (
    <motion.div
      className=" shadow-lg rounded-lg p-8 mb-8 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-black">
          <thead className="bg-gray-950">
            <th
              scope="col"
              className=" px-6 py-3 text-left text-xs sm:text-base font-medium sm:font-normal text-gray-300 uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className=" px-6 py-3 text-left text-xs sm:text-base font-medium sm:font-normal text-gray-300 uppercase tracking"
            >
              Price
            </th>
            <th
              scope="col"
              className=" px-6 py-3 text-left text-xs sm:text-base font-medium sm:font-normal text-gray-300 uppercase tracking"
            >
              Category
            </th>
            <th
              scope="col"
              className=" px-6 py-3 text-left text-xs sm:text-base font-medium sm:font-normal text-gray-300 uppercase tracking"
            >
              featured
            </th>
            <th
              scope="col"
              className=" px-6 py-3 text-left text-xs sm:text-base font-medium sm:font-normal text-gray-300 uppercase tracking"
            >
              Actions
            </th>
          </thead>
          <tbody className="bg-black divide-y divide-black">
            {products?.map((product) => (
              <tr key={product._id} className="hover:bg-stone-950">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm sm:text-base  tracking-wider font-medium sm:font-normal text-white">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    ${product.price.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm sm:text-base text-gray-300">
                    {product.category}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleFeaturedProduct(product._id)}
                    className={`p-1 rounded-full ${
                      product.isFeatured
                        ? "bg-yellow-400 text-gray-900"
                        : "bg-gray-950 text-gray-300"
                    } hover:bg-yellow-500 transition-colors duration-200`}
                  >
                    <Star className="h-5 w-5" />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductsList;
