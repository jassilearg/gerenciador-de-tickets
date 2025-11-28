const API_URL = 'http://localhost:3001/tickets';
const AUTH_URL = 'http://localhost:3001/auth';

// Função para obter headers de autenticação
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
}

// Criar um novo ticket
export async function criarTicket(titulo, descricao, tipo_categoria, prioridade) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ titulo, descricao, tipo_categoria, prioridade })
  });
  return res.json();
}

export async function atualizarTicket(id, dados) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(dados)
  });
  return res.json();
}

// Listar tickets pendentes
export async function listarPendentes() {
  const res = await fetch(`${API_URL}/pendentes`, {
    headers: getAuthHeaders()
  });
  return res.json();
}

// Listar tickets classificados
export async function listarClassificados() {
  const res = await fetch(`${API_URL}/classificados`, {
    headers: getAuthHeaders()
  });
  return res.json();
}

// Processar tickets pendentes
export async function processarPendentes() {
  const res = await fetch(`${API_URL}/processar`, {
    method: 'PUT',
    headers: getAuthHeaders()
  });
  return res.json();
}

// Login de usuário
export async function realizarLogin(email, senha) {
  const res = await fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });
  return res.json();
}

// Cadastro de usuário
export async function realizarCadastro(nome, email, senha, confirmarSenha) {
  const res = await fetch(`${AUTH_URL}/cadastro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha, confirmarSenha })
  });
  return res.json();
}

// Remover (marcar como deletado) um ticket
export async function removerTicket(id) {
  const res = await fetch(`${API_URL}/${id}/deletar`, {
    method: 'PUT',
    headers: getAuthHeaders()
  });
  return res.json();
}
