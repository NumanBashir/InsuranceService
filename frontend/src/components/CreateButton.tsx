import { FiPlusSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CreateButton = () => {
  const navigate = useNavigate();

  const goToCreateService = () => {
    navigate("/create-service");
  };
  return (
    <>
      <div className="p-8 flex items-start justify-end absolute top-[-8px] right-66">
        <button type="button" onClick={goToCreateService} className="relative">
          <FiPlusSquare className="text-3xl text-green-500" />
        </button>
      </div>
    </>
  );
};

export default CreateButton;
