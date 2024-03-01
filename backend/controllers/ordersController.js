import { Order } from "../models/Order.js";
import { User } from "../models/User.js";

const ordersController = {
  // POST new order
  createOrder: async (req, res) => {
    try {
      const { email, services } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user has already placed orders
      let existingOrder = await Order.findOne({ email });

      if (existingOrder) {
        // If the user has existing orders, update the services array
        existingOrder.services.push(...services);
        await existingOrder.save();
        return res.status(200).json(existingOrder);
      } else {
        // Create a new order if the user has no existing orders
        const newOrder = new Order({
          email: email,
          services: services,
        });

        const savedOrder = await newOrder.save();

        user.orders.push(savedOrder._id);
        await user.save();

        return res.status(201).json(savedOrder);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // GET all orders
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find({});

      return res.status(200).json({
        count: orders.length,
        data: orders,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  },

  // GET order by ID
  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);

      return res.status(200).json(order);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  },

  // DELETE order by ID
  deleteOrderById: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await Order.findByIdAndDelete(id);

      if (!result) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).send({ message: "Order deleted successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  },
};

export default ordersController;
