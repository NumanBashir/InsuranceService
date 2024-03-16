import { User } from "../models/User.js";
import { Insurance } from "../models/Insurance.js";

const userController = {
  // POST new user
  createUser: async (req, res) => {
    try {
      const { name, email, number, address, insurances, services } = req.body;

      if (!name || !email) {
        return res
          .status(400)
          .send({ message: "Name and email fields are required." });
      }

      // Validate insurance IDs (No changes here)
      const insuranceIdsAreValid = await Promise.all(
        insurances.map(async (id) => {
          const insurance = await Insurance.findById(id);
          return insurance !== null;
        })
      );

      if (insuranceIdsAreValid.includes(false)) {
        return res
          .status(400)
          .send({ message: "One or more insurance IDs are invalid." });
      }

      // Check if a user with the provided email already exists
      let existingUser = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(409)
          .json({ message: "A user with this email already exists." });
      }

      // Now include services in the new user creation
      const newUser = new User({
        name,
        email,
        number,
        address,
        insurances,
        services, // Add this line
        orders: [],
      });

      const savedUser = await newUser.save();
      return res.status(201).json(savedUser);
    } catch (error) {
      console.error("Error creating or updating user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // GET all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({})
        .populate({
          path: "orders",
          populate: { path: "services", select: "name" },
        })
        .populate("insurances", "name")
        .populate("services", "name");

      return res.status(200).json({
        count: users.length,
        data: users,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // GET user by ID
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findById(id)
        .populate({
          path: "orders",
          populate: { path: "services", select: "name" },
        })
        .populate("insurances", "name")
        .populate("services", "name");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // GET user by Email
  getUserByEmail: async (req, res) => {
    try {
      const { email } = req.params;

      // Find the user by email in the database
      const user = await User.findOne({ email })
        .populate({
          path: "orders",
          populate: { path: "services", select: "name" },
        })
        .populate("insurances", "name")
        .populate("services", "name");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user by email:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  searchUsersByName: async (req, res) => {
    try {
      const { query } = req.query;

      const users = await User.find({
        $or: [{ name: { $regex: query, $options: "i" } }],
        // $or: [{ email: { $regex: query, $options: "i" } }],
      });

      return res.status(200).json(users);
    } catch (error) {
      console.error("Error searching for users:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // GET services by user ID
  getServicesByUserId: async (req, res) => {
    try {
      const { userId } = req.params;

      // Find the user by ID in the database
      const user = await User.findById(userId).populate("services", "name");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Extract the names of the services
      const serviceNames = user.services.map((service) => service.name);

      return res.status(200).json(serviceNames);
    } catch (error) {
      console.error("Error fetching services by user ID:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // GET insurances by user ID
  getInsurancesByUserId: async (req, res) => {
    try {
      const { userId } = req.params;

      // Find the user by ID in the database
      const user = await User.findById(userId).populate("insurances", "name"); // Only populate the name field from insurances

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Extract the names of the insurances
      const insuranceNames = user.insurances.map((insurance) => insurance.name);

      return res.status(200).json(insuranceNames);
    } catch (error) {
      console.error("Error fetching insurances by user ID:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteServiceFromUser: async (req, res) => {
    try {
      const { userId, serviceId } = req.params;

      // Find the user and remove the service ID from their services array
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the service is actually in the user's services list
      if (!user.services.includes(serviceId)) {
        return res
          .status(404)
          .json({ message: "Service not found in user's services list" });
      }

      // Remove the service from the user's services list
      user.services = user.services.filter(
        (sId) => sId.toString() !== serviceId
      );
      await user.save();

      return res.status(200).json({
        message: "Service removed from user successfully",
        services: user.services.name, // Optionally return the updated list of services
      });
    } catch (error) {
      console.error("Error removing service from user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default userController;
