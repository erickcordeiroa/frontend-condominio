import axios from 'axios';
import Cookies from 'js-cookie';

type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

type LoggedType = {
  user: UserType;
  token: string;
}

const API_URL = import.meta.env.VITE_API_URL_BACKEND;

export const authLogin = async (email: string, password: string): Promise<LoggedType> => {
  try {
    const response = await axios.post<LoggedType>(`${API_URL}/login`, { email, password }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 7000,
    });

    if (response.data.token) {
      Cookies.set("u-info", JSON.stringify(response.data.user), { expires: 1 });
      Cookies.set("u-token", JSON.stringify(response.data.token), { expires: 1 });
    }
    
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const authLogout = (): void => {
  Cookies.remove("u-info");
  Cookies.remove("u-token");
};

export const isAuthenticated = (): boolean => {
  const token = Cookies.get("u-token");
  if (!token) return false;
  return true
};
