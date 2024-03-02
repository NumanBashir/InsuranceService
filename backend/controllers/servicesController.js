import { Service } from "../models/Service.js";

const serviceController = {
  // POST new service
  createService: async (req, res) => {
    try {
      if (
        !req.body.name ||
        !req.body.description ||
        !req.body.price || // TODO: Fix so it can be 0
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
