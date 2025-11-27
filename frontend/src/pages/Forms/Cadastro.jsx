import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormularioCadastro from "../../components/Form/FormularioCadastro.jsx";
import Styles from "./FormPage.module.css";

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
        <div className={Styles.main}>
            <FormularioCadastro onCadastro={handleCadastro} />
            <p>
                Já possui conta ? <a onClick={irParaLogin}>Login</a>
            </p>
        </div>
    );
}
