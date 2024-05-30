import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import useUserState from "../../hooks/userUseState";
import Popup from "../../components/PopUp";

const ShoppingCart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();
  const userState = useUserState();
  const [showEmptyCartPopup, setShowEmptyCartPopup] = useState(false);

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

  return (
    <>
      {showEmptyCartPopup && (
        <Popup
          behavior={redirectToHome}
          showButton={true}
          title="Din indkøbskurv er tom"
          message="Du har ikke noget i din vogn. Tag det første skridt på en rejse fyldt
          med opdagelser!"
          buttonText="Shop mere"
        />
      )}
      <div className="text-center my-8 mt-16">
        <h1 className="font-bold text-4xl text-white">Din indkøbskurv</h1>
      </div>
      <div className="flex justify-center items-start space-x-4 mx-auto px-16 mt-52">
        <div className="flex-1 overflow-x-auto shadow-lg rounded-lg">
          <table className="table-auto w-full bg-white rounded-lg">
            <thead className="text-gray-700 bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium uppercase tracking-wider">
                  Pris
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
                      alt={item.name}
                      className="h-20 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-900">
                      {item.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {item.price} kr
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
            Samlet pris: {totalPrice} kr
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
