"use client";

import { User } from "@/payload-types";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/users/login`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    // If the response is not ok, throw an error
    if (!response.ok) {
      throw new Error(data.error.message);
    }

    // Set the user state
    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    // Call the logout API
    await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/users/logout`, {
      method: "POST",
    });

    // Set the user state to null
    setUser(null);
  }, []);

  // when component mounts, check if the user is logged in
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/users/me`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        setUser(null);
      });
  });

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
