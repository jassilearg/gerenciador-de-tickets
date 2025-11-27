import React, { useState } from 'react';
import { realizarLogin } from '../../api.js';
import './FormularioLogin.module.css'

export default function FormularioLogin({ onLogin }){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        setErro('');
        setIsLoading(true);

        try {
            const resultado = await realizarLogin(email, senha);

            const data = await resultado.json();

            if(!resultado.ok){
                setErro(data.error || "Erro ao realizar login");
                setIsLoading(false);
                return;
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            onLogin(data.user);

        } catch (err) {
            setErro('Erro ao conectar com o servidor');
            setIsLoading(false);
        }
    }

    return (
        <div style={{ padding: '10px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>E-mail:</label>
          <input
            id='email'
            type='email'
            value={email}
            placeholder='Seu e-mail'
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', marginBottom: '5px' }}
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            id='senha'
            type='password'
            placeholder='Sua senha'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{ width: '100%', marginBottom: '5px' }}
          />
        </div>
        <br/>
        <button id='botao-submit' type="submit" disabled={isLoading}>{isLoading ? 'Entrando...' : 'Entrar'}</button>
      </form>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
  );


}