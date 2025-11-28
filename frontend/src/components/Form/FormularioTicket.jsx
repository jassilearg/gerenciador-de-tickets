import { useState } from "react";
import { criarTicket } from "../../api";

// Components
import Input from "./../Input/input";
import Button from "./../Button/Button";

// Styles
import Styles from "./Form.module.css";

export default function FormularioTicket({ onCancel, onSuccess }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoCliente, setTipoCliente] = useState("GRATUITO");
  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!titulo || !descricao) {
      setMensagem("Preencha todos os campos!");
      return;
    }

    const novoTicket = await criarTicket(titulo, descricao, tipoCliente);
    if (novoTicket.error) {
      setMensagem("Erro ao criar ticket.");
    } else {
      setMensagem("✅ Ticket criado com sucesso!");
      setTitulo("");
      setDescricao("");
      setTipoCliente("GRATUITO");
      // onTicketCriado();
    }

    onSuccess(novoTicket);
  }

  return (
    <div className={Styles.form_container} id={Styles.form_container}>
      <div className={Styles.form_content}>
        <div className={Styles.form_header}>
          <h2>Novo Ticket</h2>
        </div>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <div>
            <label>Título:</label>
            <Input
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div>
            <label>Descrição:</label>
            <br />
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div>
            <label>Tipo de Cliente:</label>
            <br />
            <select
              id="tipo-cliente"
              value={tipoCliente}
              onChange={(e) => setTipoCliente(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <option id="gratuito" value="GRATUITO">
                Gratuito
              </option>
              <option id="basico" value="BASICO">
                Básico
              </option>
              <option id="premium" value="PREMIUM">
                Premium
              </option>
            </select>
          </div>
          <div className={Styles.footer_buttons}>
            <Button
              id="botao-cancel"
              color="secondary"
              type="button"
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button id="botao-submit" color="primary" type="submit">
              Adicionar
            </Button>
          </div>
        </form>
        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
}
