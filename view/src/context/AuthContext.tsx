import React, { createContext, useState } from "react";
import { AuthContextType, AuthProviderProps } from "../utils/types";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  email: "",
  password: "",
  error: "",
  loading: false,
  setEmail: () => {},
  setPassword: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("e-book token") ? true : false
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState<string>(
    localStorage.getItem("e-book email") || ""
  );
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const login = async () => {
    const payload = {
      email,
      password,
    };
    setLoading(true);
    try {
      const res = await fetch("https://long-tie-tick.cyclic.app//users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setLoading(false);
      if (data.message === "Login Successful") {
        setIsAuthenticated(true);
        localStorage.setItem("e-book token", data.token);
        localStorage.setItem("e-book username", data.username);
        localStorage.setItem("e-book email", email);
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("e-book token");
    localStorage.removeItem("e-book username");
    localStorage.removeItem("e-book email");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        email,
        loading,
        password,
        error,
        setEmail,
        setPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
