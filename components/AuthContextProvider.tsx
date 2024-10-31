"use client";

import { User } from "@/payload-types";
import { api } from "@/utilities/api";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    // Call the login API
    const { user } = await api("/users/login", {
      body: JSON.stringify({ email, password }),
    });

    // Set the user state
    setUser(user);
  }, []);

  const logout = useCallback(async () => {
    // Call the logout API
    await api("/users/logout");
    // Set the user state to null
    setUser(null);
  }, []);

  // when component mounts, check if the user is logged in
  useEffect(() => {
    api("/users/me", { method: "GET" })
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
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
