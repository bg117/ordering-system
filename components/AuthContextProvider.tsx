"use client";

import { Admin, User } from "@/payload-types";
import { api } from "@/utilities/api";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: User | Admin | null | undefined;
  isAdmin: boolean;
  setUser: (user: User | Admin | null | undefined) => void;
  login: (email: string, password: string, admin: boolean) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function userRoute(admin: boolean, route: string) {
  return admin ? `/admins/${route}` : `/users/${route}`;
}

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | Admin | null | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = useCallback(
    async (email: string, password: string, admin: boolean) => {
      // Call the login API
      const { user } = await api(userRoute(admin, "login"), {
        body: JSON.stringify({ email, password }),
      });

      // Set the user state
      setUser(user);
      setIsAdmin(admin);
      localStorage.setItem("isAdmin", admin.toString());
    },
    []
  );

  const logout = useCallback(async () => {
    // Call the logout API
    await api(userRoute(isAdmin, "logout"));
    // Set the user state to null
    setUser(null);
  }, [isAdmin]);

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(admin);
    api(userRoute(admin, "me"), { method: "GET" })
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
}
