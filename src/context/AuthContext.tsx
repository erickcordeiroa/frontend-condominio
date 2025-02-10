import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";

type UserType = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: UserType | null;
  login: (userData: UserType) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType | null>(null);

  const login = (userData: UserType) => {
    setUser(userData);
    Cookies.set("u-info", JSON.stringify(userData), { expires: 1 });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("u-info");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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