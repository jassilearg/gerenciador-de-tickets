import React, { useState } from 'react';
import FormularioLogin from "../components/Login/FormularioLogin.jsx";
import { useNavigate } from 'react-router-dom';
import '../components/Login/FormularioLogin.module.css';

export default function Login(){

    const navigate = useNavigate();

    function handleLogin(user){
        navigate('/dashboard');
    }

    function irParaCadastro(){
        navigate('/cadastro');
    }

    return(
        <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
            <div style={{ flex: '0 0 320px' }}>
                <FormularioLogin onLogin={handleLogin}/>
                <button onClick={irParaCadastro}>Cadastre-se</button>
            </div>
        </div>
    )
}

