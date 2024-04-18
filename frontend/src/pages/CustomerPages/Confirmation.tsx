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
      <h1 className="text-lg font-semibold">Order Bekræftelse</h1>
      {order ? (
        <div>
          <h2>Tak for din ordre!</h2>
          <div className="flex-1 overflow-x-auto shadow-lg rounded-lg">
            <table className="table-auto w-full bg-white rounded-lg">
              <thead className="text-gray-700 bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                    Service
                  </th>

                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide.gray-200">
                {order.services.map((service, index) => (
                  <tr key={index} className="hover:bg.gray-50">
                    <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                      <img
                        src="/leakbot.png"
                        className="h-20 rounded-full object-cover"
                      />
                      <span className="font-medium text-gray-900">
                        {service}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default Confirmation;
