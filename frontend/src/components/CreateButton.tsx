import { FiPlusSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CreateButton = () => {
  const navigate = useNavigate();

  const goToCreateService = () => {
    navigate("/create-service");
  };
  return (
    <>
      <div className="absolute top-6 right-44 flex items-center justify-center">
        <button type="button" onClick={goToCreateService} className="relative">
          <FiPlusSquare className="text-3xl text-green-500" />
        </button>
      </div>
    </>
  );
};

export default CreateButton;
