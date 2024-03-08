import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";

interface Service {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
}

const ProductDetails = () => {
  const [service, setService] = useState<Service>({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/services/${id}`)
      .then((response) => {
        setService(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching service id: ", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center items-center p-5 my-10">
          <img src="/fysio.jpeg" className="w-1/3 rounded-lg" />
          <div className="ml-5 w-1/4">
            <h2 className="text-3xl font-bold mb-3">{service.name}</h2>
            <p className="mb-3">{service.description}</p>
            <p className="font-bold mb-5">{service.price} DKK</p>
            <div className="flex flex-col gap-2">
              <button
                className="bg-white hover:bg-gray-100 text-tertiary border-2 border-tertiary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                LÆG I INDKØBSKURVEN
              </button>
              <button
                className="bg-tertiary hover:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                KØB NU
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
