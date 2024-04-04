// useUserState.ts
import { useLocation } from "react-router-dom";

const useUserState = () => {
  const location = useLocation();
  const state = location.state as {
    email: string;
    name: string;
    userId: string;
    address: string;
  } | null;
  return state;
};

export default useUserState;
