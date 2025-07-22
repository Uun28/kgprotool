"use client";
import { createContext, useContext, useState, useEffect } from "react";
export const LoginUserContext = createContext();

export function LoginUserProvider({ children }) {
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    // Baca user dari localStorage waktu halaman di-load
    const saved = localStorage.getItem("loginUser");
    if (saved) setLoginUser(JSON.parse(saved));
  }, []);

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
}
