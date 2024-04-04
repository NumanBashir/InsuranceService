import React, { useEffect, useState } from "react";
import TextField from "../../components/TextField";
import useUserState from "../../hooks/userUseState";
import axios from "axios";

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

interface Field {
  label: string;
  name: keyof UserDetails;
}

const Billing: React.FC = () => {
  const userState = useUserState();
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    alert("Form submitted. Check the console for details.");
    console.log(userDetails);
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

  const fields: Field[] = [
    { label: "Fornavn", name: "firstName" },
    { label: "Efternavn", name: "lastName" },
    { label: "Email", name: "email" },
    { label: "Telefon", name: "number" },
  ];

  return (
    <div className="container mx-auto p-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Faktureringsoplysninger</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              name={field.name}
              value={userDetails[field.name]}
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
              label="Kort nummer"
              name="cardNumber" // Add 'name' prop here
              value={userDetails.cardNumber}
              onChange={handleChange}
              placeholder="Kort nummer"
            />
            <TextField
              label="MM / YY"
              name="expiry" // And here
              value={userDetails.expiry}
              onChange={handleChange}
              placeholder="MM / YY"
            />
            <TextField
              label="CVV"
              name="cvv" // And here
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
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Billing;
