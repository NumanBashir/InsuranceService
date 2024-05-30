import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/PopUp";

interface Insurance {
  _id: string;
  name: string;
}

interface ServiceFormData {
  name: string;
  description: string;
  price: number;
  eligibleInsurances: string[];
}

const CreateService: React.FC = () => {
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [formData, setFormData] = useState<ServiceFormData>({
    name: "",
    description: "",
    price: 0,
    eligibleInsurances: [],
  });

  const navigate = useNavigate();
  const animatedComponents = makeAnimated();

  useEffect(() => {
    axios
      .get("http://localhost:3000/insurances")
      .then((response) => {
        setInsurances(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching insurances:", error);
      });
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    if (name === "eligibleInsurances") {
      const options = (event.target as HTMLSelectElement).options;
      const selectedOptions: string[] = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedOptions.push(options[i].value);
        }
      }
      setFormData((prev) => ({ ...prev, eligibleInsurances: selectedOptions }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (selectedOptions: any) => {
    const selectedInsurances = selectedOptions.map(
      (option: { value: string; label: string }) => option.value
    );
    setFormData((prev) => ({
      ...prev,
      eligibleInsurances: selectedInsurances,
    }));
  };

  const redirectToAdmin = () => {
    setShowConfirmationPopup(false);
    navigate("/admin");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/services", formData)
      .then((response) => {
        setShowConfirmationPopup(true);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error posting service:", error);
        alert("Failed to add service.");
      });
  };

  const insuranceOptions = insurances.map((insurance) => ({
    value: insurance._id,
    label: insurance.name,
  }));

  return (
    <>
      {showConfirmationPopup && (
        <Popup
          behavior={redirectToAdmin}
          buttonText="Go til admin"
          title="Servicen er oprettet!"
        />
      )}

      <div className="top-36 left-0 right-0 flex justify-center items-center mt-8">
        <span className="font-bold text-white text-3xl">
          Udfyld formularen for at oprette en ny service
        </span>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 mt-56">
        <div className="mb-4 rounded w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Navn
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Navn"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 rounded w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Beskrivelse
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Beskrivelse"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 rounded w-full text-gray-700">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Pris
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 rounded w-full text-gray-700">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="eligibleInsurances"
          >
            Berettiget Service(r)
          </label>
          <Select
            options={insuranceOptions}
            components={animatedComponents}
            closeMenuOnSelect={false}
            isMulti
            placeholder="Vælg"
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSelectChange}
            value={insuranceOptions.filter((option) =>
              formData.eligibleInsurances.includes(option.value)
            )}
          />
        </div>
        <button
          type="submit"
          className="bg-tertiary text-white rounded-lg shadow hover:opacity-75 transition duration-300 font-bold focus:outline-none focus:shadow-outline py-2 px-3"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CreateService;
