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
    const [showForm, setShowForm] = useState(false);
    
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

    const handleCloseForm = () => {
        setShowForm(false);
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = '/'
    }

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
                        color="primary"
                        id="novo_ticket"
                        type="button"
                        onClick={() => {console.log(showForm); setShowForm(true)}}
                    >
                        Novo Ticket
                    </Button>
                    {showForm && <FormularioTicket onCancel={handleCloseForm} onSuccess={handleCloseForm} />}
                    <Button
                        color="secondary"
                        id="logout"
                        type="button"
                        onClick={handleLogout}
                    >
                        Sair
                    </Button>
                </div>
            </div>
        </div>
    );
}
