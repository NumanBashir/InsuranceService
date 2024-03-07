import BlueRect from "../../components/BlueRect";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div>
        <Link to="/home">
          <button>Go to home</button>
        </Link>
      </div>
    </>
  );
};

export default Login;
