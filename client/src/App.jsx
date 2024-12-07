import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { BarLoader } from "react-spinners";
import CategoryPage from "./pages/CategoryPage";

import { useCartStore } from "./stores/useCartStore";
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;
    getCartItems();
  }, [getCartItems, user]);
  if (checkingAuth) {
    return (
      <div className="z-50 text-white bg-black w-full min-h-screen flex justify-center items-center">
        <BarLoader color="#00fff0" width="80%" />
      </div>
    );
  }
  return (
    <div className="min-h-screen   text-white relative overflow-hidden  bg-black">
      <Navbar />
      <div className="mt-24">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={!user ? <SignupPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/secret-dashboard"
            element={
              user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />
            }
          />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route
            path="/cart"
            element={!user ? <Navigate to="/login" /> : <CartPage />}
          />
          <Route
            path="/purchase-success"
            element={!user ? <Navigate to="/login" /> : <PurchaseSuccessPage />}
          />
          <Route
            path="/purchase-cancel"
            element={!user ? <Navigate to="/login" /> : <PurchaseCancelPage />}
          />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
