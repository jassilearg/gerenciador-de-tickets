import React, { useState } from 'react';
import FormularioCadastro from '../components/Cadastro/FormularioCadastro';
import { useNavigate } from 'react-router-dom';
import '../components/Cadastro/FormularioCadastro.module.css'

export default function Cadastro(){

    const navigate = useNavigate();

    function handleCadastro(){
        alert('Cadastro realizado! Faça seu login');
        navigate('/');
    }

    function irParaLogin(){
        navigate('/');
    }

    return(
        <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
            <div style={{ flex: '0 0 320px' }}>
                <FormularioCadastro onCadastro={handleCadastro}/>
                <button onClick={irParaLogin}>Já tem cadastro?</button>
             </div>
        </div>
    )
}