import React from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Product 1", img: "/leakbot.png", price: 10.0 },
  { id: 2, name: "Product 2", img: "/leakbot.png", price: 20.0 },
  { id: 3, name: "Product 3", img: "/leakbot.png", price: 30.0 },
  { id: 4, name: "Product 4", img: "/leakbot.png", price: 40.0 },
];

const ShoppingCart: React.FC = () => {
  const navigate = useNavigate();
  const handleDelete = (productId: number) => {
    console.log("Deleting product with id:", productId);
  };

  const totalPrice = products.reduce((acc, product) => acc + product.price, 0);

  const handleGoToPayment = () => {
    navigate("/checkout");
  };

  return (
    <>
      <div className="">
        <h1 className="absolute top-40 left-0 right-0 mx-auto text-center font-bold text-white text-4xl">
          Din indkøbskurv
        </h1>
      </div>
      <div className="flex justify-center items-start space-x-4 mx-auto px-4 my-8 w-[1100px]">
        <div className="flex-1 overflow-x-auto shadow-lg rounded-lg">
          <table className="table-auto w-full bg-white rounded-lg">
            <thead className="text-gray-700 bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="h-20 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-900">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {product.price}kr
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleDelete(product.id)}>
                      <img
                        src="/trash-bin 1.png"
                        alt="Delete"
                        className="h-10 mx-auto hover:opacity-75 transition duration-300"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-[350px] rounded-lg shadow-lg p-4 flex flex-col items-center">
          <div className="text-center font-bold text-xl">
            Samlet pris: {totalPrice}kr
          </div>
          <button
            className="mt-4 px-6 py-2 bg-tertiary text-white rounded-lg shadow hover:opacity-75 transition duration-300"
            onClick={handleGoToPayment}
          >
            Gå til betaling
          </button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
