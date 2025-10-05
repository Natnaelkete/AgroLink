// File: src/App.tsx

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ForgotPassword from "./components/authPages/ForgotPassword";
import ResetPassword from "./components/authPages/ResetPassword";
import SignUp from "./components/authPages/SignUp";
import SignIn from "./components/authPages/SignIn";
import PostProduct from "./components/Product/PostProduct";
import DashboardLayout from "./components/DashboardLayout";
import ProductsList from "./components/Product/ProductList";
import Calendar from "./pages/Calendar";
import Dashboard from "./pages/Dashboard";
import ProductDetail from "./components/Product/ProductDetail";
import { CartProvider } from "./components/cart/CartContext";
import CartPage from "./components/cart/CartPage";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import Weather from "./components/weather/WeatherAdvice";
import "./index.css";
import MainLayout from "./components/MainLayout";
import About from "./pages/About";
import SoilAdvice from "./pages/SoilAdvice";
import PaymentSuccessPage from "./components/cart/PaymentSuccessPage";
import AdviceForm from "./components/advice/DiseaseDetection";
import FarmerProfile from "./components/profile/FarmerProfile";
import NewsPage from "./pages/news";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Pages with only the Header */}
          <Route element={<MainLayout />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>

          {/* Dashboard Pages with the Header and Sidebar */}
          <Route element={<DashboardLayout />}>
            <Route path="/products" element={<ProductsList />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<FarmerProfile />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/create-product" element={<PostProduct />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/weather-detector" element={<Weather />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/soil-advice" element={<SoilAdvice />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/disease-detection" element={<AdviceForm />} />
          </Route>
        

        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;