import { Service } from "../models/Service.js";
import { User } from "../models/User.js";

const serviceController = {
  // POST new service
  createService: async (req, res) => {
    try {
      if (
        !req.body.name ||
        !req.body.description ||
        req.body.price === undefined ||
        req.body.price === null ||
        !req.body.variations ||
        !req.body.eligibleInsurances
      ) {
        return res
          .status(400)
          .send({ message: "Send all valid fields of service" });
      }
      const newService = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        variations: req.body.variations,
        eligibleInsurances: req.body.eligibleInsurances,
      };
      const service = await Service.create(newService);
      return res.status(201).send(service);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  },

  // GET all services
  getAllServices: async (req, res) => {
    try {
      const services = await Service.find({});

      return res.status(200).json({
        count: services.length,
        data: services,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  },

  // display the services based on what is eligble for users
  getUserSpecificService: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId)
        .populate("insurances")
        .populate("services");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Map user's current service IDs to a format we can easily check against
      const userServiceIds = user.services.map((service) =>
        service._id.toString()
      );

      // Retrieve all services
      let services = await Service.find({});

      let serviceMap = new Map();

      services.forEach((service) => {
        // Skip if the user already has this service
        if (userServiceIds.includes(service._id.toString())) {
          return;
        }

        // Check if the user has all the insurances required by the service
        const isUserEligibleForService = service.eligibleInsurances.every(
          (id) =>
            user.insurances.some((ins) => ins._id.toString() === id.toString())
        );

        let existingService = serviceMap.get(service.name);

        if (isUserEligibleForService) {
          // Prioritize free services or services not already in the map, or paid services when a free one isn't available
          if (
            service.price === 0 ||
            !existingService ||
            (existingService && existingService.price > 0)
          ) {
            serviceMap.set(service.name, service);
          }
        } else if (
          !existingService &&
          service.eligibleInsurances.length === 0
        ) {
          // Include the service if it requires no specific insurances and it's not already included
          serviceMap.set(service.name, service);
        }
      });

      const servicesToShow = Array.from(serviceMap.values());

      // Optional: sort services by name
      servicesToShow.sort((a, b) => a.name.localeCompare(b.name));

      res.json(servicesToShow);
    } catch (error) {
      console.error("Error fetching services for user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // GET service by ID
  getServiceById: async (req, res) => {
    try {
      const { id } = req.params;
      const service = await Service.findById(id);

      return res.status(200).json(service);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  },

  // DELETE service by ID
  deleteServiceById: async (req, res) => {
    try {
      const { id } = req.params;

      // Delete the service and remove its reference from any User documents
      const deletedService = await Service.findByIdAndDelete(id);

      if (!deletedService) {
        return res.status(404).json({ message: "Service not found" });
      }

      return res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default serviceController;
