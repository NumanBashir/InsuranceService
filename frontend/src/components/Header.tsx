import { useNavigate } from "react-router-dom";
import useUserState from "../hooks/userUseState";

const Header = () => {
  const navigate = useNavigate();
  const userState = useUserState();

  const redirectToHomeOrAdmin = () => {
    if (userState?.userId) {
      navigate("/home", { state: userState });
    } else {
      navigate("/admin");
    }
  };

  return (
    <header className="app-header m-6">
      <button onClick={redirectToHomeOrAdmin}>
        <img src="/top_logo.png" className="w-64" alt="Home" />
      </button>
    </header>
  );
};

export default Header;
