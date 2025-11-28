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
import search from "../../img/search.svg";
import Button from "./../../components/Button/Button";
import Styles from "./Dashboard.module.css";

export default function App() {
  const [pendentes, setPendentes] = useState([]);
  const [classificados, setClassificados] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  async function carregarListas() {
    const [p, c] = await Promise.all([
      listarPendentes(),
      listarClassificados(),
    ]);
    setPendentes(p);
    setClassificados(c);

    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      console.log(user);
      setUserEmail(user.email);
      setUserName(user.nome);
    }
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
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleAddTicket = (novoTicket) => {
    setPendentes((prev) => [novoTicket, ...prev]);
  };

  return (
    <div className={Styles.main}>
      <div className={Styles.header}>
        <div className={Styles.header_logo}>
          <img src={logo} alt="" />
          <div>
            <h2>Sistema de Tickets</h2>
            <p>{userEmail}</p>
          </div>
        </div>
        <div className={Styles.header_buttons}>
          <Button
            color="primary"
            id="novo_ticket"
            type="button"
            onClick={() => {
              console.log(showForm);
              setShowForm(true);
            }}
          >
            Novo Ticket
          </Button>
          {showForm && (
            <FormularioTicket
              onCancel={handleCloseForm}
              onSuccess={(ticketCriado) => {
                handleCloseForm();
                handleAddTicket(ticketCriado);
              }}
            />
          )}
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
      <hr className={Styles.hr_style} />
      <div className={Styles.text_container}>
        <p>Fila de tickets</p>
      </div>
      <div className={Styles.description}>
        <p>
          {pendentes?.length + classificados?.length} ticket(s) encontrado(s)
        </p>
      </div>
      <div className={Styles.search_container}>
        <div className={Styles.search_bar}>
          <input
            type="text"
            placeholder="Buscar ticket..."
            style={{ backgroundColor: "#F1F1F1", outline: "none" }}
          />
        </div>
        <div className={Styles.search_button}>
          <button>Todos os status</button>
        </div>
        <div className={Styles.search_button}>
          <button>Todas as prioridades</button>
        </div>
      </div>
      <div className={Styles.dashboard_container}>
        <table className={Styles.ticket_table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Status</th>
              <th>Responsável</th>
            </tr>
          </thead>
          <tbody>
            {[...pendentes, ...classificados].map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.titulo}</td>
                <td>
                  <span
                    className={`${Styles.badge} ${
                      ticket.status === "pendente"
                        ? Styles.status_pendente
                        : Styles.status_classificado
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td>{userName || "Não definido"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
