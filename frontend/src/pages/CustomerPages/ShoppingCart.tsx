import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import useUserState from "../../hooks/userUseState";
import { useEffect, useState } from "react";

const ShoppingCart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();
  const userState = useUserState();
  const [showEmptyCartPopup, setShowEmptyCartPopup] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      // Trigger the popup if cart is empty
      setShowEmptyCartPopup(true);
    }
  }, [cartItems.length]);

  const handleDelete = (id: string) => {
    removeFromCart(id);
  };
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleGoToPayment = () => {
    if (cartItems.length > 0) {
      navigate("/billing", { state: userState });
    } else {
      setShowEmptyCartPopup(true);
    }
  };

  const redirectToHome = () => {
    setShowEmptyCartPopup(false);
    navigate("/home", { state: userState });
  };
  //bg-white hover:bg-gray-100 text-tertiary border-2 border-tertiary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
  return (
    <>
      {showEmptyCartPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg text-center">
            <h2 className="font-bold mb-4">Din indkøbskurv er tom</h2>
            <h3 className="mb-4">
              Du har ikke noget i din vogn. Tag det første skridt på en rejse
              fyldt med opdagelser!
            </h3>
            <button
              className="px-6 py-2 bg-tertiary text-white rounded-lg shadow hover:bg-blue-400"
              onClick={redirectToHome}
            >
              Shop mode
            </button>
          </div>
        </div>
      )}
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
              {cartItems.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                    <img
                      src="/leakbot.png"
                      className="h-20 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-900">
                      {item.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {item.price}kr
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleDelete(item._id)}>
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
