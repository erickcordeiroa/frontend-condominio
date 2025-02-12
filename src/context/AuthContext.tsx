import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";
import { authLogin, isAuthenticated } from "@/service/authService";
import { useNavigate } from "react-router-dom";


type UserData = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  userData: () => UserData | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<boolean>(isAuthenticated());
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      await authLogin(email, password);

      setAuth(true);
      navigate("/admin/properties");
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setAuth(false);
    Cookies.remove("u-info");
    Cookies.remove("u-token");
    navigate("/login");
  };

  const userData = () => {
    const userInfo = Cookies.get("u-info");
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: auth, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
  };