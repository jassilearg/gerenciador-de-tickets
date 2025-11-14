const API_URL = 'http://localhost:3001/tickets';
const AUTH_URL = 'http://localhost:3001/auth';

//rota para proteger dados, o servidor só responde se o usuario estiver logado
function getAuthHeaders(){
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  }
}

export async function criarTicket(titulo, descricao, tipo_cliente) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ titulo, descricao, tipo_cliente })
  });
  return res.json();
}

export async function listarPendentes() {
  const res = await fetch(`${API_URL}/pendentes`, {
    headers: getAuthHeaders(),
  });
  return res.json();
}

export async function listarClassificados() {
  const res = await fetch(`${API_URL}/classificados`, {
    headers: getAuthHeaders(),
  });
  return res.json();
}

export async function processarPendentes() {
  const res = await fetch(`${API_URL}/processar`, { 
    method: 'PUT',
    headers: getAuthHeaders(), 
  });
  return res.json();
}

//login

export async function realizarLogin(email,senha){
  const res = await fetch(`${AUTH_URL}/login`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });
  return res;
}

//cadastro

export async function realizarCadastro(nome,email,senha,confirmarSenha){
  const res = await fetch(`${AUTH_URL}/cadastro`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha, confirmarSenha })
  });
  return res;
}
