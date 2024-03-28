import React, { useState } from "react";
import TextField from "../../components/TextField";

type UserDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  additionalInfo: string;
};

const Billing: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: "Reece",
    lastName: "James",
    email: "ReeceJames@chelsea.dk",
    phone: "12345678",
    address: "Ballerupdtu2750",
    cardNumber: "",
    expiry: "",
    cvv: "",
    additionalInfo: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle the form submission
    // This is where you would typically send the data to a server
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

  return (
    <div className="container mx-auto p-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Faktureringsoplysninger</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Fornavn"
            name="firstname"
            value={userDetails.firstName}
            readOnly
          />
          <TextField
            label="Efternavn"
            name="lastname"
            value={userDetails.lastName}
            readOnly
          />
          <TextField
            label="Email"
            name="Email"
            value={userDetails.email}
            readOnly
          />
          <TextField
            label="Telefon"
            name="Phone"
            value={userDetails.phone}
            readOnly
          />
          <div className="md:col-span-2">
            <TextField
              label="Adresse"
              name="address"
              value={userDetails.address}
              readOnly
            />
          </div>
          <div className="mb-4 md:flex md:items-center md:justify-between">
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
