import express from 'express';
import { calcularUrgencia } from '../services/slaService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { titulo, descricao, tipo_cliente } = req.body;
  const Ticket = req.app.get('models').Ticket;

  if (!titulo || !descricao || !tipo_cliente) {
    return res.status(400).json({ error: 'titulo, descricao e tipo_cliente são obrigatórios' });
  }

  try {
    const ticket = await Ticket.create({
      titulo,
      descricao,
      tipo_cliente,
      status: 'PENDENTE',
      urgencia_calculada: null
    });
    return res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao criar ticket' });
  }
});

router.get('/pendentes', async (req, res) => {
  const Ticket = req.app.get('models').Ticket;
  try {
    const pendentes = await Ticket.findAll({ where: { status: 'PENDENTE' }, order: [['createdAt', 'ASC']] });
    return res.json(pendentes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar tickets pendentes' });
  }
});

router.get('/classificados', async (req, res) => {
  const Ticket = req.app.get('models').Ticket;
  try {
    const classificados = await Ticket.findAll({ where: { status: 'CLASSIFICADO' }, order: [['updatedAt', 'DESC']] });
    return res.json(classificados);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar tickets classificados' });
  }
});

router.put('/processar', async (req, res) => {
  const Ticket = req.app.get('models').Ticket;
  try {
    const pendentes = await Ticket.findAll({ where: { status: 'PENDENTE' } });
    if (pendentes.length === 0) {
      return res.status(200).json({ processed: 0, message: 'Nenhum ticket pendente' });
    }

    const processed = [];
    for (const t of pendentes) {
      const urgencia = calcularUrgencia(t.tipo_cliente, t.descricao);
      t.urgencia_calculada = urgencia;
      t.status = 'CLASSIFICADO';
      await t.save();
      processed.push({ id: t.id, urgencia });
    }

    return res.status(200).json({ processed: processed.length, items: processed });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao processar tickets' });
  }
});

router.put('/:id/deletar', async (req, res) => {
  const { id } = req.params;
  const Ticket = req.app.get('models').Ticket;

  try {
    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket não encontrado' });
    }

    ticket.status = 'DELETADO';
    await ticket.save();

    return res.status(200).json({ message: 'Ticket marcado como deletado', id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao marcar ticket como deletado' });
  }
});

export default router;
