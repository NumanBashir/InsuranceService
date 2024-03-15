import { User } from "../models/User.js";
import { Insurance } from "../models/Insurance.js";

const userController = {
  // POST new user
  createUser: async (req, res) => {
    try {
      const { name, email, number, address, insurances } = req.body;

      if (!name || !email) {
        return res
          .status(400)
          .send({ message: "Name and email fields are required." });
      }

      // Validate insurance IDs
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

      const newUser = new User({
        name,
        email,
        number,
        address,
        insurances,
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
        .populate("insurances", "name");

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
        .populate("insurances", "name");

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
        .populate("insurances", "name");

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
        $or: [{ email: { $regex: query, $options: "i" } }],
      });

      return res.status(200).json(users);
    } catch (error) {
      console.error("Error searching for users:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default userController;
