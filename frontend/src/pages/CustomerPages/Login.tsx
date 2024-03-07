import NameCard from "../../components/NameCard";

const Login = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-2xl py-8 m-4 w-1/2 max-w-2xl">
          <div className="flex flex-col items-center">
            <span className="text-xl font-semibold">Admin Login:</span>
            <NameCard />
            <span className="text-xl font-semibold mt-8">Customer Login:</span>
            <NameCard />
            <NameCard />
            <NameCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
