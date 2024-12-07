import React from "react";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import EmptyCartUI from "../components/EmptyCartUI";
import CartItem from "../components/CartItem";
import PeopleAlsoBrought from "../components/PeopleAlsoBrought";
import OrderSummary from "../components/OrderSummary";
import CouponCard from "../components/CouponCard";

const CartPage = () => {
  const { cart } = useCartStore();
  return (
    <div className="py-8 md:py-16 mx-8  ">
      <div className="mx-auto max-w-screen-xl px-4 xl:px-0">
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <motion.div
            className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}
            {cart.length > 0 && <PeopleAlsoBrought />}
          </motion.div>
          {cart.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mx-auto max-w-4xl mt-6 flex-1 space-y-6 lg:mt-0 lg:w-full"
            >
              <OrderSummary />
              <CouponCard />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
