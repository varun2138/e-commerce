import React from "react";
import { Link } from "react-router-dom";
const CategoryItem = ({ category }) => {
  return (
    <div className="relative overflow-hidden h-80 w-full rounded-lg group">
      <Link to={"/category" + category.href}>
        <div className="w-full h-full cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950 opacity-50 z-10">
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
              <h3 className="text-white text-xl font-bold mb-2">
                {category.name}
              </h3>
              <p className="text-gray-200 text-sm">Explore {category.name}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
