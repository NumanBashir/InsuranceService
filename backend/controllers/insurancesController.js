import { Insurance } from "../models/Insurance.js";

const insuranceController = {
  // POST new insurance
  createInsurance: async (req, res) => {
    try {
      if (!req.body.name) {
        return res
          .status(400)
          .send({ message: "Send the name field of the insurance" });
      }
      const newInsurance = {
        name: req.body.name,
      };
      const insurance = await Insurance.create(newInsurance);
      return res.status(201).send(insurance);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  },

  // GET all insurances
  getAllInsurances: async (req, res) => {
    try {
      const insurances = await Insurance.find({});

      return res.status(200).json({
        count: insurances.length,
        data: insurances,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  },

  // GET insurance by ID
  getInsuranceById: async (req, res) => {
    try {
      const { id } = req.params;
      const insurance = await Insurance.findById(id);

      return res.status(200).json(insurance);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  },
};

export default insuranceController;
