import { User } from "../models/User.js";

const userController = {
  // POST new user
  createUser: async (req, res) => {
    try {
      if (!req.body.name || !req.body.email) {
        return res
          .status(400)
          .send({ message: "Name and email field are required" });
      }

      const { name, email, number, address, insurances } = req.body;

      // Check if a user with the provided email already exists
      let existingUser = await User.findOne({ email });

      if (existingUser) {
        // If the user already exists, update their information
        existingUser.name = name;
        existingUser.number = number;
        existingUser.address = address;
        existingUser.insurances = insurances;

        // Save the updated user to the database
        const updatedUser = await existingUser.save();
        return res.status(200).json(updatedUser);
      } else {
        // If the user does not exist, create a new user
        const newUser = new User({
          name,
          email,
          number, // TODO: Validate this by 8-digits
          address,
          orders: [], // Initialize orders array as empty
          insurances,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
      }
    } catch (error) {
      // Handle any errors that occur during user creation or update
      console.error("Error creating or updating user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // GET all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});

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

      // Find the user by ID in the database
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // If user is found, return it
      return res.status(200).json(user);
    } catch (error) {
      // Handle any errors that occur during retrieval
      console.error("Error fetching user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // GET user by Email
getUserByEmail: async (req, res) => {
  try {
    const { email } = req.params; 

    // Find the user by email in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
 
    console.error("Error fetching user by email:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
},

};

export default userController;
