const API_URL = 'http://localhost:3001/tickets';

export async function criarTicket(titulo, descricao, tipo_cliente) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, descricao, tipo_cliente })
  });
  return res.json();
}

export async function listarPendentes() {
  const res = await fetch(`${API_URL}/pendentes`);
  return res.json();
}

export async function listarClassificados() {
  const res = await fetch(`${API_URL}/classificados`);
  return res.json();
}

export async function processarPendentes() {
  const res = await fetch(`${API_URL}/processar`, { method: 'PUT' });
  return res.json();
}
