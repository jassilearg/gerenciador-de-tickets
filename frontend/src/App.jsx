import { listarPendentes, listarClassificados, removerTicket } from './api';
import './App.css';
import React, { useEffect, useState } from 'react';
import FormularioTicket from './components/FormularioTicket';
import ListaTickets from './components/ListaTickets';
import BotaoProcessar from './components/BotaoProcessar';

export default function App() {
  const [pendentes, setPendentes] = useState([]);
  const [classificados, setClassificados] = useState([]);

  async function carregarListas() {
    const [p, c] = await Promise.all([
      listarPendentes(),
      listarClassificados()
    ]);
    setPendentes(p);
    setClassificados(c);
  }

  async function handleRemover(id) {
    await removerTicket(id);
    await carregarListas(); // 👈 ATUALIZA A UI
  }

  useEffect(() => {
    carregarListas();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      <BotaoProcessar onProcessar={carregarListas} />
      <div style={{ flex: '0 0 320px' }}>
        <FormularioTicket onTicketCriado={carregarListas} />
      </div>

      <ListaTickets
      titulo="Fila Pendente"
      tickets={pendentes}
      onRemover={handleRemover}
      />


      <ListaTickets
        titulo="Fila Classificada"
        tickets={classificados}
        onRemover={handleRemover}
      />
    </div>
  );
}
