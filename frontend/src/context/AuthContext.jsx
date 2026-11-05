import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    const token = localStorage.getItem("cybernexus_token");
    if (!token) return setLoading(false);
    try {
      const { data } = await api.get("/auth/me");
      setUser(data.user);
    } catch {
      localStorage.removeItem("cybernexus_token");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("cybernexus_token", data.token);
    setUser(data.user);
  }

  async function register(username, email, password) {
    const { data } = await api.post("/auth/register", { username, email, password });
    localStorage.setItem("cybernexus_token", data.token);
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem("cybernexus_token");
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
