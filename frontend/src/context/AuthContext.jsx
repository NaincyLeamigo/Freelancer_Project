
import React, { createContext, useContext, useEffect, useState } from "react";
import { signinAPI, logoutAPI } from "../api/AuthApi";
import api from "../api/Api";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // fetch current user on mount (server reads cookie)
  const fetchMe = async () => {
    try {
      const res = await api.get("/api/auth/me");
      const u = res?.data?.data?.user ?? null;
      setUser(u);
    } catch (err) {
      setUser(null);
    } finally {
      setInitializing(false);
    }
  };

  useEffect(() => {
    fetchMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email, password) => {
    // signinAPI will set cookies in response (HttpOnly). Backend should return user data.
    const res = await signinAPI({ email, password });
    const u = res?.data?.data?.user ?? null;
    setUser(u);
    return u;
  };

  const logout = async () => {
    try {
      await logoutAPI(); // backend clears cookies
    } catch (e) {
      // ignore
    } finally {
      setUser(null);
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, initializing }}>
      {children}
    </AuthContext.Provider>
  );
}
