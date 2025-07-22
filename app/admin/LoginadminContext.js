"use client";
import { createContext, useContext, useState, useEffect } from "react";
export const LoginadminContext = createContext();

export function LoginadminProvider({ children }) {
  const [loginadmin, setLoginAdmin] = useState(null);

  useEffect(() => {
    // Baca user dari localStorage waktu halaman di-load
    const saved = localStorage.getItem("loginadmin");
    if (saved) setLoginAdmin(JSON.parse(saved));
  }, []);

  return (
    <LoginadminContext.Provider value={{ loginadmin, setLoginAdmin }}>
      {children}
    </LoginadminContext.Provider>
  );
}
