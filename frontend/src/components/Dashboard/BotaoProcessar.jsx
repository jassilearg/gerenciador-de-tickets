import { useState } from 'react';
import { processarPendentes } from '../../api';
import './BotaoProcessar.module.css'

export default function BotaoProcessar({ onProcessar }) {
  const [mensagem, setMensagem] = useState('');

  async function handleClick() {
    setMensagem('⏳ Processando...');
    const resultado = await processarPendentes();
    if (resultado.error) {
      setMensagem('Erro ao processar tickets.');
    } else {
      setMensagem(`✅ ${resultado.processed} tickets processados.`);
      onProcessar();
    }
  }

  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
      <button id='processar-fila' onClick={handleClick}>Processar Fila Pendente</button>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
