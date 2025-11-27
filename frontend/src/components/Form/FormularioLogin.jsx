import React, { useState } from "react";
import { realizarLogin } from "../../api.js";

import Styles from "./Form.module.css";

import logo from "./../../img/logo.png";
import Input from "../Input/input.jsx";
import Button from "../Button/Button.jsx";

export default function FormularioLogin({ onLogin }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setErro("");
        setIsLoading(true);

        try {
            const resultado = await realizarLogin(email, senha);

            const data = await resultado.json();

            if (!resultado.ok) {
                setErro(data.error || "Erro ao realizar login");
                setIsLoading(false);
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            onLogin(data.user);
        } catch (err) {
            setErro("Erro ao conectar com o servidor");
            setIsLoading(false);
        }
    }

    return (
        <div className={Styles.form_container}>
            <div className={Styles.form_content}>
                <div className={Styles.form_header}>
                    <img src={logo} alt="" />
                    <h2>Sistema de Tickets</h2>
                    <p>Entre com suas credenciais para acessar o sistema</p>
                </div>
                <form className={Styles.form} onSubmit={handleSubmit}>
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
                        <label>Senha</label>
                        <Input
                            id="senha"
                            type="password"
                            placeholder="*******"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    <Button type="submit" isLoading={isLoading}>
                        Entrar
                    </Button>
                </form>
                {erro && <p style={{ color: "red" }}>{erro}</p>}
            </div>
        </div>
    );
}
