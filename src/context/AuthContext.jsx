import { createContext, useEffect, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

  
  useEffect(() => {
    const savedSession = localStorage.getItem("session");
    if (savedSession) {
      setSession(JSON.parse(savedSession));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
