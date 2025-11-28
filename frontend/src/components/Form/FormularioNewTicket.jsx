import { useState } from "react";
import { criarTicket } from "../../api";

// Components
import Input from "../Input/Input";
import Button from "../Button/Button";

// Styles
import Styles from "./Form.module.css";

export default function FormularioTicket({ onCancel, onSuccess }) {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipoCategoria, setTipoCategoria] = useState("Suporte");
    const [prioridade, setPrioridade] = useState("Baixa");
    const [mensagem, setMensagem] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        if (!titulo || !descricao) {
            setMensagem("Preencha todos os campos!");
            return;
        }

        const novoTicket = await criarTicket(
            titulo,
            descricao,
            tipoCategoria,
            prioridade
        );

        if (novoTicket.error) {
            setMensagem("Erro ao criar ticket.");
        } else {
            setMensagem("✅ Ticket criado com sucesso!");
            setTitulo("");
            setDescricao("");
            setTipoCategoria("Suporte");
            setPrioridade("Baixa");
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
                        <textarea
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Categoria:</label>
                        <select
                            id="tipo-cliente"
                            value={tipoCategoria}
                            onChange={(e) => setTipoCategoria(e.target.value)}
                        >
                            <option value="Tecnico">Tecnico</option>
                            <option value="Financeiro">Financeiro</option>
                            <option value="Suporte">Suporte</option>
                            <option value="Vendas">Vendas</option>
                        </select>
                    </div>

                    <div>
                        <label>Prioridade:</label>
                        <select
                            id="prioridade"
                            value={prioridade}
                            onChange={(e) => setPrioridade(e.target.value)}
                        >
                            <option value="Baixa">Baixa</option>
                            <option value="Media">Média</option>
                            <option value="Alta">Alta</option>
                            <option value="Critica">Crítica</option>
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
