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

export const AuthProvider = ({ children }: AuthProviderProps) => {
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
    const payload = { email, password };
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://e-shop-215k.onrender.com/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);
      if (res.ok && data.message === "Login Successful") {
        setIsAuthenticated(true);
        localStorage.setItem("e-book token", data.token);
        localStorage.setItem("e-book username", data.username);
        localStorage.setItem("e-book email", email);
        navigate("/");
      } else {
        throw new Error(data.message || "Invalid credentials.");
      }
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("e-book token");
    localStorage.removeItem("e-book username");
    localStorage.removeItem("e-book email");
    navigate("/login");
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
