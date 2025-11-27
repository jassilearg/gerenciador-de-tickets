import { useState } from 'react';
import { criarTicket } from '../../api';
import './FormularioTicket.module.css'

export default function FormularioTicket({ onTicketCriado }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoCliente, setTipoCliente] = useState('GRATUITO');
  const [mensagem, setMensagem] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!titulo || !descricao) {
      setMensagem('Preencha todos os campos!');
      return;
    }

    const novoTicket = await criarTicket(titulo, descricao, tipoCliente);
    if (novoTicket.error) {
      setMensagem('Erro ao criar ticket.');
    } else {
      setMensagem('✅ Ticket criado com sucesso!');
      setTitulo('');
      setDescricao('');
      setTipoCliente('GRATUITO');
      onTicketCriado();
    }
  }

  return (
    <div style={{ padding: '10px' }}>
      <h2>Novo Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label><br />
          <input
            id='titulo'
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            style={{ width: '100%', marginBottom: '5px' }}
          />
        </div>
        <div>
          <label>Descrição:</label><br />
          <textarea
            id='descricao'
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            style={{ width: '100%', height: '80px', marginBottom: '5px' }}
          />
        </div>
        <div>
          <label>Tipo de Cliente:</label><br />
          <select
            id='tipo-cliente'
            value={tipoCliente}
            onChange={(e) => setTipoCliente(e.target.value)}
            style={{ width: '100%', marginBottom: '10px' }}
          >
            <option id='gratuito' value="GRATUITO">Gratuito</option>
            <option id='basico'  value="BASICO">Básico</option>
            <option id='premium' value="PREMIUM">Premium</option>
          </select>
        </div>
        <button id='botao-submit' type="submit">Adicionar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
