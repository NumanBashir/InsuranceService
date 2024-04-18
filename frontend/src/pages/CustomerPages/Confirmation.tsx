import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface OrderDetails {
  _id: string;
  email: string;
  otherInfo: string;
  services: string[];
}

const Confirmation = () => {
  const location = useLocation();
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Fetching the order details using the order ID passed in the state
        const response = await axios.get(
          `http://localhost:3000/orders/${location.state.orderDetails._id}`
        );
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    if (
      location.state &&
      location.state.orderDetails &&
      location.state.orderDetails._id
    ) {
      fetchOrderDetails();
    }
  }, [location.state]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-lg font-semibold">Order Confirmation</h1>
      {order ? (
        <div>
          <h2>Thank you for your purchase!</h2>
          <h3>Services Purchased:</h3>
          <ul>
            {order.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default Confirmation;
