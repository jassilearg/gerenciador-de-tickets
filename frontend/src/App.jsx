import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Forms/Login";
import Dashboard from "./pages/Dash/Dashboard";
import Cadastro from "./pages/Forms/Cadastro";
import "./App.css";

function PrivateRoute({ children }) {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    if (!token) {
        return navigate("/");
    }

    return children;
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/cadastro" element={<Cadastro />} />

            <Route
                path="/dashboard"
                element={
                    //<PrivateRoute>
                    <Dashboard />
                    //</PrivateRoute>
                }
            />
        </Routes>
    );
}
