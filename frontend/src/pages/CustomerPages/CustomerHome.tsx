// CustomerHome.tsx
import { useLocation } from "react-router-dom";
import ServiceCard from "../../components/ServiceCard";

const CustomerHome = () => {
  const location = useLocation();
  const state = location.state as { name: string };

  const handlePurchase = () => {
    console.log("Purchase clicked");
  };

  return (
    <div>
      <div className="absolute top-0 left-0 right-0 h-72 flex justify-center items-center">
        <span className="font-bold text-white">
          Velkommen til Insurance service, {state.name}
        </span>
      </div>
      <div className="flex justify-center items-start h-screen">
        <h1 className="text-4xl font-bold text-black mt-4">
          Se hvilke servicer du er berettiget til og kan købe!
        </h1>
        <ServiceCard
          title="Leakbot"
          description="Få installeret en leakbot på dit vandrør og spar penge på unødige vandskader"
          imageUrl="/path-to-leakbot-image.jpg" // Update with your image path
          buttonText="KØB NU"
          onButtonClick={handlePurchase}
        />
      </div>
    </div>
  );
};

export default CustomerHome;
