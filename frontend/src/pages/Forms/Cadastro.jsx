import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import FormularioCadastro from "../../components/Form/FormularioCadastro.jsx";

// Styles
import CadastroPageStyle from "./FormPage.module.css";

export default function Cadastro() {
    const navigate = useNavigate();

    function handleCadastro() {
        alert("Cadastro realizado! Faça seu login");
        navigate("/");
    }

    function irParaLogin() {
        navigate("/");
    }

    return (
        <div className={CadastroPageStyle.main}>
            <FormularioCadastro onCadastro={handleCadastro} />
            <p>
                Já possui conta ? <a onClick={irParaLogin}>Login</a>
            </p>
        </div>
    );
}
