import React, { useEffect, useState } from "react";

import FormularioTicket from "../../components/Form/FormularioTicket";
import ListaTickets from "../../components/Dashboard/ListaTickets";
import BotaoProcessar from "../../components/Dashboard/BotaoProcessar";

import {
    listarPendentes,
    listarClassificados,
    removerTicket,
} from "./../../api";

import logo from "../../img/logo.png";
import Button from "./../../components/Button/Button";
import Styles from "./Dashboard.module.css";

export default function App() {
    const [pendentes, setPendentes] = useState([]);
    const [classificados, setClassificados] = useState([]);

    async function carregarListas() {
        const [p, c] = await Promise.all([
            listarPendentes(),
            listarClassificados(),
        ]);
        setPendentes(p);
        setClassificados(c);
    }

    async function handleRemover(id) {
        await removerTicket(id);
        await carregarListas();
    }

    useEffect(() => {
        carregarListas();
    }, []);

    return (
        <div className={Styles.main}>
            <div className={Styles.header}>
                <div className={Styles.header_logo}>
                    <img src={logo} alt="" />
                    <div>
                        <h2>Sistema de Tickets</h2>
                        <p>Gerencie seus tickets de forma eficiente</p>
                    </div>
                </div>
                <div className={Styles.header_buttons}>
                    <Button
                        id="novo_ticket"
                        type="button"
                    >
                        Novo Ticket
                    </Button>
                    <Button
                        className={Styles.secondary}
                        id="logout"
                        type="button"
                    >
                        Sair
                    </Button>
                </div>
            </div>
            <FormularioTicket />
        </div>
    );
}
