import { createContext } from "react";
import useUserInfo from "../hooks/useUserInfo";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const allContexts = useUserInfo();
  return (
    <AuthContext.Provider value={allContexts}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
