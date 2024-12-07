import React from "react";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const handleAddToCart = () => {
    if (!user) {
      toast.error("login with user credentials");
      return;
    }
    addToCart(product);
  };
  return (
    <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg group">
      <div className="relative  flex h-64 overflow-hidden  ">
        <img
          src={product.image}
          alt=" product image"
          className="object-cover w-full "
        />
        <div className="absolute inset-0 bg-black bg-opacity-80 bottom-0 h-64 w-full  opacity-0  translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <div className="mt-4 px-5 pb-5">
            <h5 className="text-lg sm:text-xl font-semibold uppercase text-white">
              {product.name}
            </h5>
            <p className=" text-base opacity-50">{product.description}</p>
            <div className="mt-2 mb-5 flex items-center justify-end bg-transparent">
              <p>
                <span className="text-2xl font-bold  text-green-500">
                  ${product.price}
                </span>
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center rounded-lg bg-[#fffadc] px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-[#f6e99e]"
            >
              <ShoppingCart size={22} className="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
