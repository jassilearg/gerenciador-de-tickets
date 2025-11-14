import React, { useState } from 'react';
import { realizarCadastro } from '../../api';
import './FormularioCadastro.module.css'

export default function FormularioCadastro({ onCadastro }){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erro, setErro] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        setErro('');
        setIsLoading(true);

        if(senha !== confirmarSenha){
            setErro('As senhas não coincidem');
            return;
        }

        setIsLoading(true);

        try {
            const resultado = await realizarCadastro(nome,email,senha,confirmarSenha)
            const data = await resultado.json();

            if(!resultado.ok){
                setErro(data.error || "Erro ao realizar login");
                setIsLoading(false);
                return;
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            onCadastro(data.user);

        } catch (err) {
            console.error("ERRO REAL:", err);
            setErro('Erro ao conectar com o servidor');
            setIsLoading(false);
        }
    }

    return (
        <div style={{ padding: '10px' }}>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label><br />
          <input
            id='nome'
            value={nome}
            placeholder='Seu nome'
            onChange={(e) => setNome(e.target.value)}
            style={{ width: '100%', marginBottom: '5px' }}
          />
        </div>
        <div>
          <label>E-mail:</label><br />
          <input
            id='email'
            type='email'
            placeholder='Seu e-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', marginBottom: '5px' }}
          />
        </div>
        <div>
          <label>Senha:</label><br />
          <input
            id='senha'
            type='password'
            placeholder='Sua senha'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{ width: '100%', marginBottom: '5px' }}
          />
        </div>
        <div>
          <label>Confirmar senha:</label><br />
          <input
            id='confirmarSenha'
            type='password'
            placeholder='Confirme sua senha'
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            style={{ width: '100%', marginBottom: '5px' }}
          />
        </div>
        <button id='botao-submit' type="submit" disabled={isLoading}>{isLoading ? 'Cadastrando...' : 'Cadastrar'}</button>
      </form>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
    )
}