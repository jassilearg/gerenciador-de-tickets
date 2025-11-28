import express from 'express';

const router = express.Router();

// Criar um novo ticket
router.post('/', async (req, res) => {
  const { titulo, descricao, tipo_categoria, prioridade } = req.body;
  const Ticket = req.app.get('models').Ticket;

  if (!titulo || !descricao || !tipo_categoria || !prioridade) {
    return res.status(400).json({ error: 'titulo, descricao, tipo_categoria e prioridade são obrigatórios' });
  }

  try {
    const ticket = await Ticket.create({
      titulo,
      descricao,
      tipo_categoria,
      prioridade,
      status: 'Pendente', // default do model
    });

    return res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao criar ticket' });
  }
});

// Listar tickets pendentes
router.get('/pendentes', async (req, res) => {
  const Ticket = req.app.get('models').Ticket;

  try {
    const pendentes = await Ticket.findAll({ where: { status: 'Pendente' }, order: [['createdAt', 'ASC']] });
    return res.json(pendentes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar tickets pendentes' });
  }
});

// Listar tickets classificados
router.get('/classificados', async (req, res) => {
  const Ticket = req.app.get('models').Ticket;

  try {
    const classificados = await Ticket.findAll({ where: { status: 'Classificado' }, order: [['updatedAt', 'DESC']] });
    return res.json(classificados);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar tickets classificados' });
  }
});

// Processar tickets pendentes
router.put('/processar', async (req, res) => {
  const Ticket = req.app.get('models').Ticket;

  try {
    const pendentes = await Ticket.findAll({ where: { status: 'Pendente' } });

    if (pendentes.length === 0) {
      return res.status(200).json({ processed: 0, message: 'Nenhum ticket pendente' });
    }

    const processed = [];
    for (const t of pendentes) {
      t.urgencia_calculada = urgencia; // Defina a lógica de urgência conforme necessário
      t.status = 'Classificado';
      await t.save();
      processed.push({ id: t.id, urgencia });
    }

    return res.status(200).json({ processed: processed.length, items: processed });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao processar tickets' });
  }
});

// Atualizar um ticket existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, tipo_categoria, prioridade, status } = req.body;
  const Ticket = req.app.get('models').Ticket;

  try {
    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket não encontrado' });
    }

    ticket.titulo = titulo ?? ticket.titulo;
    ticket.descricao = descricao ?? ticket.descricao;
    ticket.tipo_categoria = tipo_categoria ?? ticket.tipo_categoria;
    ticket.prioridade = prioridade ?? ticket.prioridade;
    ticket.status = status ?? ticket.status;

    await ticket.save();

    return res.status(200).json(ticket);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao atualizar ticket' });
  }
});

// Remover (marcar como deletado) um ticket
router.put('/:id/deletar', async (req, res) => {
  const { id } = req.params;
  const Ticket = req.app.get('models').Ticket;

  try {
    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket não encontrado' });
    }

    ticket.status = 'Deletado';
    await ticket.save();

    return res.status(200).json({ message: 'Ticket marcado como deletado', id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao marcar ticket como deletado' });
  }
});

export default router;
