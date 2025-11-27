import React from "react";
import { useNavigate } from "react-router-dom";

// Components
import FormularioLogin from "../../components/Form/FormularioLogin.jsx";

// Styles
import LoginPageStyle from "./FormPage.module.css";

export default function Login() {
    const navigate = useNavigate();

    function handleLogin(user) {
        navigate("/dashboard");
    }

    function irParaCadastro() {
        navigate("/cadastro");
    }

    return (
        <div className={`${LoginPageStyle.main} ${LoginPageStyle.login}`}>
            <FormularioLogin onLogin={handleLogin} />
            <p>
                Ainda não tem conta ?{" "}
                <a onClick={irParaCadastro}>Cadastre-se</a>
            </p>
        </div>
    );
}
