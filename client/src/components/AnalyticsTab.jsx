import React, { useEffect, useState } from "react";
import AnalyticsCard from "./AnalyticsCard";
import { motion } from "framer-motion";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarLoader } from "react-spinners";

import axiosInstance from "../lib/axios";
const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const res = await axiosInstance.get("/analytics");
        setAnalyticsData(res.data.analyticsData);
        setDailySalesData(res.data.dailySalesData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching analytics Data");
        setIsLoading(false);
      }
    };
    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return (
      <div className="z-50 text-white bg-black w-full min-h-screen flex justify-center items-center">
        <BarLoader color="#00fff0" width="80%" />
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.totalUsers?.toLocaleString()}
          icon={Users}
          color="bg-gradient-to-r from-slate-950  to-black "
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.totalProducts?.toLocaleString()}
          icon={Package}
          color="bg-gradient-to-r from-slate-950  to-black "
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales?.toLocaleString()}
          icon={ShoppingCart}
          color="bg-gradient-to-r from-slate-950  to-black "
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`$${analyticsData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="bg-gradient-to-r from-slate-950  to-black "
        />
      </div>
      <motion.div
        className="bg-gray-9500/60 rounded-lg p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <div className="height-[400px] sm:h-full overflow-x-scroll overflow-y-hidden sm:overflow-x-hidden ">
          <div className="w-[800px] sm:w-full">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#D1D5DB" />
                <YAxis yAxisId="left" stroke="#D1D5DB" />
                <YAxis yAxisId="right" orientation="right" stroke="#D1D5DB" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sales"
                  stroke="#10B981"
                  activeDot={{ r: 8 }}
                  name="Sales"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  activeDot={{ r: 8 }}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default AnalyticsTab;
