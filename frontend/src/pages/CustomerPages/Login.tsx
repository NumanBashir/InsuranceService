import NameCard from "../../components/NameCard";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div>
        <div className="flex flex-col justify-center items-center">
          <span className="mt-4">Admin Login:</span>
          <NameCard />
          <span className="mt-4">Customer Login:</span>
          <NameCard />
          <NameCard />
          <NameCard />
        </div>

        <Link to="/home">
          <button>Go to home</button>
        </Link>
      </div>
    </>
  );
};

export default Login;
