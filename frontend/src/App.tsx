import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/CustomerPages/Login";
import CustomerHome from "./pages/CustomerPages/CustomerHome";
import ProductDetails from "./pages/CustomerPages/ProductDetails";
import ShoppingCart from "./pages/CustomerPages/ShoppingCart";
import Confirmation from "./pages/CustomerPages/Confirmation";
import AdminHome from "./pages/AdminPages/AdminHome";
import CustomerDetails from "./pages/AdminPages/CustomerDetails";
import Billing from "./pages/CustomerPages/Billing";
import { CartProvider } from "./context/CartContext";
import CreateService from "./pages/AdminPages/CreateService";

const App = () => {
  return (
    <CartProvider>
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
          path="/billing"
          element={
            <Layout>
              <Billing />
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
        <Route
          path="/admin"
          element={
            <Layout>
              <AdminHome />
            </Layout>
          }
        />
        <Route
          path="/customer/:id"
          element={
            <Layout>
              <CustomerDetails />
            </Layout>
          }
        />
        <Route
          path="/create-service"
          element={
            <Layout>
              <CreateService />
            </Layout>
          }
        />
      </Routes>
    </CartProvider>
  );
};

export default App;
