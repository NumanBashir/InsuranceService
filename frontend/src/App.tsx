// App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/CustomerPages/Login";
import CustomerHome from "./pages/CustomerPages/CustomerHome";
import ProductDetails from "./pages/CustomerPages/ProductDetails";
import ShoppingCart from "./pages/CustomerPages/ShoppingCart";
import Checkout from "./pages/CustomerPages/Billing";
import Confirmation from "./pages/CustomerPages/Confirmation";
import AdminHome from "./pages/AdminPages/AdminHome";
import CustomerDetails from "./pages/AdminPages/CustomerDetails";
import Billing from "./pages/CustomerPages/Billing";

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
    </Routes>
  );
};

export default App;
