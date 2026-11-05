import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import News from "./pages/News";
import CTFs from "./pages/CTFs";
import Groups from "./pages/Groups";
import GroupDetails from "./pages/GroupDetails";
import Discussions from "./pages/Discussions";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext";
import React from "react";
function Private({ children }) { const { user, loading } = useAuth(); if (loading) return <p>Loading...</p>; return user ? children : <Navigate to="/login" /> }

export default function App() {
  return <BrowserRouter><Routes><Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/news" element={<News />} />
    <Route path="/ctfs" element={<CTFs />} />
    <Route path="/groups" element={<Groups />} />
    <Route path="/groups/:id" element={<GroupDetails />} />
    <Route path="/discussions" element={<Discussions />} />
    <Route path="/login" element={<Auth mode="login" />} />
    <Route path="/register" element={<Auth mode="register" />} />
    <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
  </Route></Routes></BrowserRouter>
}
