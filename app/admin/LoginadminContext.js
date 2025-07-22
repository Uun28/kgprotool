"use client";
import { createContext, useContext, useState, useEffect } from "react";
export const LoginadminContext = createContext();

export function LoginadminProvider({ children }) {
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    // Baca user dari localStorage waktu halaman di-load
    const saved = localStorage.getItem("loginUser");
    if (saved) setLoginUser(JSON.parse(saved));
  }, []);

  return (
    <LoginadminContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginadminContext.Provider>
  );
}
