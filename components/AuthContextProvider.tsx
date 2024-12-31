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
  user: User | Admin | undefined;
  status: "user" | "admin" | "loading" | "logged-out";
  login: (email: string, password: string, admin: boolean) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function userRoute(admin: string, route: string) {
  return `/${admin}s/${route}`;
}

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | Admin | undefined>(undefined);
  const [status, setStatus] = useState<
    "user" | "admin" | "loading" | "logged-out"
  >("loading");

  const login = useCallback(
    async (email: string, password: string, admin: boolean) => {
      const type = admin ? "admin" : "user";

      // Call the login API
      const { user } = await api(userRoute(type, "login"), {
        body: JSON.stringify({ email, password }),
      });

      // Set the user state
      setUser(user);
      setStatus(type);
      localStorage.setItem("userType", type);
    },
    []
  );

  const logout = useCallback(async () => {
    // Call the logout API
    await api(userRoute(status, "logout"));
    // Set the user state to null
    setUser(undefined);
    setStatus("logged-out");
  }, [status]);

  useEffect(() => {
    const type =
      localStorage.getItem("userType") === "admin" ? "admin" : "user";

    api(userRoute(type, "me"), { method: "GET" })
      .then((data) => {
        setUser(data.user);
        setStatus(type);
      })
      .catch(() => {
        setUser(undefined);
        setStatus("logged-out");
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, status, login, logout }}>
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
