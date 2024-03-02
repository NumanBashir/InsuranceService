import { Order } from "../models/Order.js";
import { User } from "../models/User.js";

const ordersController = {

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
  
        // Populate the updated order before sending the response
        const populatedOrder = await Order.findById(existingOrder._id).populate('services', 'name');
  
        // Transform the populated order to include only service names
        const transformedOrder = {
          ...populatedOrder._doc,
          services: populatedOrder.services.map(service => service.name),
        };
  
        return res.status(200).json(transformedOrder);
      } else {
        // Create a new order if the user has no existing orders
        const newOrder = new Order({
          email: email,
          services: services,
        });
  
        const savedOrder = await newOrder.save();
       
        const populatedNewOrder = await Order.findById(savedOrder._id).populate('services', 'name');
  
        const transformedNewOrder = {
          ...populatedNewOrder._doc,
          services: populatedNewOrder.services.map(service => service.name),
        };
  
        return res.status(201).json(transformedNewOrder);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  

  getAllOrders: async (req, res) => {
    try {
      
      const orders = await Order.find({}).populate('services', 'name');
  
      const ordersWithServiceNames = orders.map(order => ({
        ...order._doc,
        services: order.services.map(service => service.name),
      }));
  
      return res.status(200).json({
        count: ordersWithServiceNames.length,
        data: ordersWithServiceNames,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const order = await Order.findById(id).populate('services', 'name');
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      const transformedOrder = {
        ...order._doc,
        services: order.services.map(service => service.name),
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
      await User.updateMany(
        { orders: id },
        { $pull: { orders: id } }
      );

      return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

};

export default ordersController;
