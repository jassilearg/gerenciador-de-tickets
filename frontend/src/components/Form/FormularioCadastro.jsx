import React, { useState } from "react";
import { realizarCadastro } from "../../api";

// Components
import logo from "./../../img/logo.png";
import Input from "./../Input/input";
import Button from "./../Button/Button";

// Styles
import FormCadastroStyles from "./Form.module.css";

export default function FormularioCadastro({ onCadastro }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [erro, setErro] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setErro("");
        setIsLoading(true);

        if (senha !== confirmarSenha) {
            setErro("As senhas não coincidem");
            return;
        }

        setIsLoading(true);

        try {
            const resultado = await realizarCadastro(
                nome,
                email,
                senha,
                confirmarSenha
            );
            const data = await resultado.json();

            if (!resultado.ok) {
                setErro(data.error || "Erro ao realizar login");
                setIsLoading(false);
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            onCadastro(data.user);
        } catch (err) {
            console.error("ERRO REAL:", err);
            setErro("Erro ao conectar com o servidor");
            setIsLoading(false);
        }
    }

    return (
        <div className={FormCadastroStyles.form_container}>
            <div className={FormCadastroStyles.form_content}>
                <div className={FormCadastroStyles.form_header}>
                    <img src={logo} alt="" />
                    <h2>Sistema de Tickets</h2>
                    <p>Registre suas credenciais para acessar o sistema</p>
                </div>
                <form className={FormCadastroStyles.form} onSubmit={handleSubmit}>
                    <div>
                        <label>Nome:</label>
                        <Input
                            id="nome"
                            value={nome}
                            placeholder="Seu nome"
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>E-mail:</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Senha:</label>
                        <Input
                            id="senha"
                            type="password"
                            placeholder="*******"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Confirmar senha:</label>
                        <Input
                            id="confirmarSenha"
                            type="password"
                            placeholder="*******"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                        />
                    </div>
                    <Button
                        color="primary"
                        id="botao-submit"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Cadastrando..." : "Cadastrar"}
                    </Button>
                </form>
                {erro && <p style={{ color: "red" }}>{erro}</p>}
            </div>
        </div>
    );
}
