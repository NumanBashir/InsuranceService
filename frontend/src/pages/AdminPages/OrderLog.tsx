import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  _id: string;
  userName: string;
  email: string;
  services: string[];
  otherInfo: string;
  timeOfPurchase: string;
}

const AdminOrderLog = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/orders");
        const fetchedOrders = response.data.data;

        // Sort orders by timeOfPurchase in descending order
        const sortedOrders = fetchedOrders.sort((a: Order, b: Order) => {
          return (
            new Date(b.timeOfPurchase).getTime() -
            new Date(a.timeOfPurchase).getTime()
          );
        });

        console.log("Sorted Orders:", sortedOrders); // Debug: log sorted orders
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl font-semibold text-gray-800 my-4 text-white">
        Order Log
      </h1>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Services
              </th>
              <th scope="col" className="py-3 px-6">
                Time of Purchase
              </th>
              <th scope="col" className="py-3 px-6">
                Other Info
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="bg-white border-b">
                <td className="py-4 px-6">{order.userName}</td>
                <td className="py-4 px-6">{order.email}</td>
                <td className="py-4 px-6">{order.services.join(", ")}</td>
                <td className="py-4 px-6">
                  {new Date(order.timeOfPurchase).toLocaleString()}
                </td>
                <td className="py-4 px-6">{order.otherInfo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderLog;
