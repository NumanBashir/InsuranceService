import React, { useEffect, useState } from "react";
import TextField from "../../components/TextField";
import useUserState from "../../hooks/userUseState";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  address: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  additionalInfo: string;
}

const Billing: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const userState = useUserState();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    additionalInfo: "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const orderData = {
      name: `${userDetails.firstName} ${userDetails.lastName}`, // Combine first and last name
      email: userDetails.email,
      otherInfo: userDetails.additionalInfo,
      services: cartItems.map((item) => item._id),
    };

    try {
      // Send a POST request to your orders endpoint
      const response = await axios.post(
        "http://localhost:3000/orders",
        orderData
      );

      console.log("Response:", response.data); // Log response from the API

      clearCart();

      navigate("/confirmation", {
        state: { ...userState, orderDetails: response.data },
      });
      console.log("Order created:", response.data);
    } catch (error) {
      console.error("Error creating order:", error); // Log any errors
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Send a GET request to the server to fetch user details based on userId
        const response = await axios.get<any>(
          `http://localhost:3000/users/${userState?.userId}`
        );

        console.log("User Data:", response.data); // Log user data from API

        // Extract user data from the response
        const userData = response.data;

        const nameParts = userData.name.split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ");

        setUserDetails({
          firstName: firstName,
          lastName: lastName,
          email: userData.email,
          number: userData.number,
          address: userData.address,
          cardNumber: userDetails.cardNumber,
          expiry: userDetails.expiry,
          cvv: userDetails.cvv,
          additionalInfo: userDetails.additionalInfo,
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userState?.userId) {
      fetchUserDetails();
    }
  }, [userState?.userId]);

  const fields = [
    { label: "Fornavn", name: "firstName", value: userDetails.firstName },
    { label: "Efternavn", name: "lastName", value: userDetails.lastName },
    { label: "Email", name: "email", value: userDetails.email },
    { label: "Telefon", name: "number", value: userDetails.number },
  ];

  return (
    <div className="container mx-auto p-8">
      <form onSubmit={handleSubmit}>
        <div className="text-center mb-6 mt-8 ">
          <h2 className="font-bold text-4xl text-white">
            Faktureringsoplysninger
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-52">
          {fields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              name={field.name}
              value={field.value}
              readOnly
            />
          ))}

          <div className="md:col-span-2">
            <TextField
              label="Adresse"
              name="address"
              value={userDetails.address}
              readOnly
            />
          </div>
          <div className="md:col-span-2 flex flex-wrap gap-4">
            <TextField
              label="Kortnummer"
              name="cardNumber"
              value={userDetails.cardNumber}
              onChange={handleChange}
              placeholder="Kortnummer"
            />
            <TextField
              label="MM / YY"
              name="expiry"
              value={userDetails.expiry}
              onChange={handleChange}
              placeholder="MM / YY"
            />
            <TextField
              label="CVV"
              name="cvv"
              value={userDetails.cvv}
              onChange={handleChange}
              placeholder="CVV"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Har du andre informationer vi burde vide om så skriv here
            </label>
            <textarea
              name="additionalInfo"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Tilføj kommentar"
              value={userDetails.additionalInfo}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-tertiary text-white rounded-lg shadow hover:opacity-75 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Billing;
