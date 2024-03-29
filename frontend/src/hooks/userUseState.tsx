// useUserState.ts
import { useLocation } from "react-router-dom";

const useUserState = () => {
  const location = useLocation();
  const state = location.state as { name: string; userId: string } | null;
  return state;
};

export default useUserState;
