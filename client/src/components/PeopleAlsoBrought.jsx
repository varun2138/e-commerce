import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { BeatLoader } from "react-spinners";
const PeopleAlsoBrought = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axiosInstance.get("/products/recommendations");
        setRecommendations(res.data.products);
      } catch (error) {
        toast.error(
          error.response.data.message ||
            "An error occured while fetching the recommendations"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  if (isLoading) {
    <BeatLoader color="#fffadc" />;
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-[#fffadc]">
        People also bought
      </h3>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg: grid-col-3">
        {recommendations.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PeopleAlsoBrought;
