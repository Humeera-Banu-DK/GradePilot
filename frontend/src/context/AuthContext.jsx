import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState(null);

  // On app load / refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");

    if (token) {
      setIsAuthenticated(true);
      if (storedEmail) setEmail(storedEmail);
    }
  }, []);

  // 🔑 login should store email also
  const login = (token, userEmail) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", userEmail);

    setIsAuthenticated(true);
    setEmail(userEmail);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    setIsAuthenticated(false);
    setEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        email,      // 👈 THIS is what Navbar needs
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
