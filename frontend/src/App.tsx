// App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/CustomerPages/Login";
import CustomerHome from "./pages/CustomerPages/CustomerHome";
import ProductDetails from "./pages/CustomerPages/ProductDetails";
import ShoppingCart from "./pages/CustomerPages/ShoppingCart";
import Checkout from "./pages/CustomerPages/Checkout";
import Confirmation from "./pages/CustomerPages/Confirmation";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/home"
        element={
          <Layout>
            <CustomerHome />
          </Layout>
        }
      />
      <Route
        path="/product/:id"
        element={
          <Layout>
            <ProductDetails />
          </Layout>
        }
      />
      <Route
        path="/shopping-cart"
        element={
          <Layout>
            <ShoppingCart />
          </Layout>
        }
      />
      <Route
        path="/checkout"
        element={
          <Layout>
            <Checkout />
          </Layout>
        }
      />
      <Route
        path="/confirmation"
        element={
          <Layout>
            <Confirmation />
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
