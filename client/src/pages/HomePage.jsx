import React, { useEffect } from "react";
import { categories } from "../utils";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { BarLoader } from "react-spinners";
const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();
  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);
  if (isLoading) {
    return (
      <div className="z-50 text-white bg-black w-full min-h-screen flex justify-center items-center">
        <BarLoader color="#00fff0" width="80%" />
      </div>
    );
  }
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-[#fffadc] mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-xl text-gray-400 mb-12">
          Discover the latest trends in eco-friendly fashion
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

        {!isLoading && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
