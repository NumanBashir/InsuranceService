// CustomerHome.tsx
import { useLocation } from "react-router-dom";

const CustomerHome = () => {
  const location = useLocation();
  const state = location.state as { name: string };

  return (
    <div className="absolute top-0 left-0 right-0 h-72 flex justify-center items-center">
      <span className="font-bold text-white">
        Velkommen til Insurance service, {state.name}
      </span>
    </div>
  );
};

export default CustomerHome;
