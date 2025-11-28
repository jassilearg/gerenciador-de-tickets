import React, { useEffect, useState } from "react";

//Components
import FormularioNewTicket from "../../components/Form/FormularioNewTicket";
import FormularioTicket from "../../components/Form/FormularioTicket";
import ListaTickets from "../../components/Dashboard/ListaTickets";
import BotaoProcessar from "../../components/Dashboard/BotaoProcessar";

// API
import { listarPendentes, listarClassificados, removerTicket } from "../../api";

//Styles
import logo from "../../img/logo.png";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import DashStyles from "./Dashboard.module.css";

export default function App() {
    const [pendentes, setPendentes] = useState([]);
    const [classificados, setClassificados] = useState([]);
    const [showNewTicketForm, setShowNewTicketForm] = useState(false);
    const [showTicketForm, setShowTicketForm] = useState(false);
    const [user, setUser] = useState({ email: "", nome: "" });
    const [ticketSelecionado, setTicketSelecionado] = useState(null);

    async function carregarListas() {
        try {
            const [p, c] = await Promise.all([
                listarPendentes(),
                listarClassificados(),
            ]);

            setPendentes(p);
            setClassificados(c);

            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                const parsedUser = JSON.parse(savedUser);
                setUser({
                    email: parsedUser.email,
                    nome: parsedUser.nome,
                });
            }
        } catch (err) {
            console.error("Erro ao carregar dados:", err);
        }
    }

    async function handleRemover(id) {
        try {
            await removerTicket(id);
            await carregarListas();
        } catch (err) {
            console.error("Erro ao remover ticket:", err);
        }
    }

    useEffect(() => {
        carregarListas();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    const handleAddTicket = (novoTicket) => {
        setPendentes((prev) => [novoTicket, ...prev]);
    };

    const handleActionClick = (ticket) => {
        setTicketSelecionado(ticket);
        setShowTicketForm(true);
    };

    const tickets = [...pendentes, ...classificados];

    return (
        <div className={DashStyles.main}>
            <div className={DashStyles.header}>
                <div className={DashStyles.header_logo}>
                    <img src={logo} alt="Logo" />
                    <div>
                        <h2>Sistema de Tickets</h2>
                        <p>{`${
                            user.email
                                ? user.email
                                : "Gerencie os seus tickets com eficiência"
                        }`}</p>
                    </div>
                </div>

                <div className={DashStyles.header_buttons}>
                    <Button
                        color="primary"
                        id="novo_ticket"
                        onClick={() => setShowNewTicketForm(true)}
                    >
                        Novo Ticket
                    </Button>

                    <Button
                        color="secondary"
                        id="logout"
                        onClick={handleLogout}
                    >
                        Sair
                    </Button>
                </div>
            </div>

            {showNewTicketForm && (
                <FormularioNewTicket
                    onCancel={() => setShowNewTicketForm(false)}
                    onSuccess={(ticketCriado) => {
                        setShowNewTicketForm(false);
                        handleAddTicket(ticketCriado);
                    }}
                />
            )}

            {showTicketForm && (
                <FormularioTicket
                    ticket={ticketSelecionado}
                    onCancel={() => setShowTicketForm(false)}
                    onSuccess={(ticketAtualizado) => {
                        setShowTicketForm(false);
                        // Atualiza a lista local sem recarregar tudo
                        setPendentes((prev) =>
                            prev.map((t) =>
                                t.id === ticketAtualizado.id
                                    ? ticketAtualizado
                                    : t
                            )
                        );
                        setClassificados((prev) =>
                            prev.map((t) =>
                                t.id === ticketAtualizado.id
                                    ? ticketAtualizado
                                    : t
                            )
                        );
                    }}
                />
            )}

            <div className={DashStyles.tickets_info}>
                <h2>Fila de tickets</h2>
                <p>{tickets.length} ticket(s) encontrado(s)</p>
            </div>

            <div className={DashStyles.search_container}>
                <Input
                    type="text"
                    placeholder="Buscar ticket..."
                    className={DashStyles.search_bar}
                />
                <div className={DashStyles.search_buttons}>
                    <Button type="button" color="secondary">
                        Todos os status
                    </Button>
                    <Button type="button" color="secondary">
                        Todas as prioridades
                    </Button>
                </div>
            </div>

            <div className={DashStyles.dashboard_container}>
                <table className={DashStyles.ticket_table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className={DashStyles.col_titulo}>Título</th>
                            <th>Categoria</th>
                            <th>Prioridade</th>
                            <th>Status</th>
                            <th>Responsável</th>
                            <th>Criado em</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tickets.map((ticket) => (
                            <tr key={ticket.id}>
                                {ticket.id < 100 ? (
                                    <td>{`#tk${
                                        ticket.id <= 9
                                            ? "00" + ticket.id
                                            : "0" + ticket.id
                                    }`}</td>
                                ) : (
                                    <td>{`#tk${ticket.id}`}</td>
                                )}
                                <td>{ticket.titulo}</td>
                                <td>{ticket.tipo_categoria}</td>
                                <td>
                                    <span
                                        className={`${DashStyles.badge} ${
                                            ticket.prioridade === "Baixa"
                                                ? DashStyles.prioridade_baixa
                                                : ticket.prioridade === "Media"
                                                ? DashStyles.prioridade_media
                                                : ticket.prioridade === "Alta"
                                                ? DashStyles.prioridade_alta
                                                : ticket.prioridade ===
                                                  "Critica"
                                                ? DashStyles.prioridade_critica
                                                : ""
                                        }`}
                                    >
                                        {ticket.prioridade}
                                    </span>
                                </td>
                                <td>
                                    <span>{ticket.status}</span>
                                </td>
                                <td>{user.nome}</td>
                                <td>
                                    {new Date(
                                        ticket.createdAt
                                    ).toLocaleDateString("pt-BR")}
                                </td>
                                <td onClick={() => handleActionClick(ticket)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 576 512"
                                    >
                                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6-46.8 43.5-78.1 95.4-93 131.1-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.7-8.4-1 10.9-.1 22.1 2.9 33.2 13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-12.2-45.7-55.5-74.8-101.1-70.8 5.3 9.3 8.4 20.1 8.4 31.7z" />
                                    </svg>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
