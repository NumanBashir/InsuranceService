import { Order } from "../models/Order.js";
import { User } from "../models/User.js";

const ordersController = {

  createOrder: async (req, res) => {
    try {
      const { email, otherInfo, services } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      console.log('User found:', user);
  
      const newOrder = new Order({
        email,
        otherInfo,
        services,
        timeOfPurchase: new Date(),
      });
  
      const savedOrder = await newOrder.save();
  
      // Add the new order to the user's orders array
      user.orders.push(savedOrder._id);
  
      // Add services from the order to the user's services array if not already present
      services.forEach((serviceId) => {
        if (!user.services.includes(serviceId)) {
          user.services.push(serviceId);
        }
      });
  
      await user.save();
  
      // Populate the savedOrder with service names before sending the response
      const populatedOrder = await Order.findById(savedOrder._id).populate(
        "services",
        "name"
      );
  
      console.log('Populated Order:', populatedOrder);
  
      // Prepare the order data for the response, including service names and user's name
      const transformedOrder = {
        ...populatedOrder._doc,
        userName: user.name,
        services: populatedOrder.services.map((service) => service.name),
      };
  
      console.log('Transformed Order:', transformedOrder);
  
      return res.status(201).json(transformedOrder);
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      // Fetch all orders and populate services
      const orders = await Order.find({}).populate("services", "name");
  
      // Transform each order to include userName
      const ordersWithUserNames = await Promise.all(orders.map(async (order) => {
        const user = await User.findOne({ email: order.email });
        return {
          ...order._doc,
          userName: user ? user.name : 'Unknown',
          services: order.services.map((service) => service.name),
        };
      }));
  
      return res.status(200).json({
        count: ordersWithUserNames.length,
        data: ordersWithUserNames,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).send({ message: error.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
  
      const order = await Order.findById(id).populate("services", "name");
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      const user = await User.findOne({ email: order.email });
  
      const transformedOrder = {
        ...order._doc,
        userName: user ? user.name : 'Unknown',
        services: order.services.map((service) => service.name),
      };
  
      return res.status(200).json(transformedOrder);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  },

  // DELETE order by ID

  deleteOrderById: async (req, res) => {
    try {
      const { id } = req.params;

      // Delete the order and remove its reference from any User documents
      const deletedOrder = await Order.findByIdAndDelete(id);

      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Now, remove the reference from the User document
      await User.updateMany({ orders: id }, { $pull: { orders: id } });

      return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default ordersController;
