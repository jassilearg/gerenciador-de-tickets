import './App.css';
import React, { useEffect, useState } from 'react';
import FormularioTicket from './components/FormularioTicket';
import ListaTickets from './components/ListaTickets';
import BotaoProcessar from './components/BotaoProcessar';
import { listarPendentes, listarClassificados } from './api';


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

  useEffect(() => {
    carregarListas();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      <BotaoProcessar onProcessar={carregarListas} />
      <div style={{ flex: '0 0 320px' }}>
        <FormularioTicket onTicketCriado={carregarListas} />
      </div>
      <ListaTickets titulo="Fila Pendente" tickets={pendentes} />
      <ListaTickets titulo="Fila Classificada" tickets={classificados} />
    </div>
  );
}
