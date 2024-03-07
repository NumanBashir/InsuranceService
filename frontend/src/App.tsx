import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/CustomerPages/Login";
import CustomerHome from "./pages/CustomerPages/CustomerHome";
import ProductDetails from "./pages/CustomerPages/ProductDetails";
import ShoppingCart from "./pages/CustomerPages/ShoppingCart";
import Checkout from "./pages/CustomerPages/Checkout";
import Confirmation from "./pages/CustomerPages/Confirmation";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<CustomerHome />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </>
  );
};

export default App;
