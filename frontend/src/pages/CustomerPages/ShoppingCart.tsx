import React from "react";

interface Product {
  id: number;
  name: string;
  img: string;
  price: string;
}

const products: Product[] = [
  { id: 1, name: "Product 1", img: "/leakbot.png", price: "$10.00" },
  { id: 2, name: "Product 2", img: "/leakbot.png", price: "$20.00" },
  { id: 3, name: "Product 3", img: "/leakbot.png", price: "$30.00" },
  { id: 4, name: "Product 4", img: "/leakbot.png", price: "$40.00" },
];

const ShoppingCart: React.FC = () => {
  const handleDelete = (productId: number) => {
    console.log("Deleting product with id:", productId);
  };

  return (
    <div className="absolute top-72 left-0 right-0 container mx-auto w-[700px]">
      <h1>Din indkøbskurv</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
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
                  {product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDelete(product.id)}>
                    <img
                      src="/trash-bin 1.png"
                      alt="Delete"
                      className="h-10 mx-auto hover:opacity-75"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShoppingCart;
