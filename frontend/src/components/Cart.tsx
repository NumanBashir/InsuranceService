import { FaShoppingBasket } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import useUserState from "../hooks/userUseState";

const Cart = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const userState = useUserState();

  const goToShoppingCart = () => {
    navigate("/shopping-cart", { state: userState });
  };

  return (
    <div className="p-8 flex items-start justify-end absolute top-[-8px] right-36">
      <button type="button" onClick={goToShoppingCart} className="relative">
        <FaShoppingBasket className="text-3xl text-gray-700" />
        {cartItems.length > 0 && (
          <span className="flex h-6 w-6 items-center absolute top-[-15px] right-[-15px] justify-center rounded-full bg-red-500 text-xs text-white">
            {cartItems.length}
          </span>
        )}
      </button>
    </div>
  );
};

export default Cart;
