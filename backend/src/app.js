import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Sequelize } from 'sequelize';
import ticketsRouter from './routes/tickets.js';
import TicketModel from './models/Ticket.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false
});

const Ticket = TicketModel(sequelize);
app.set('sequelize', sequelize);
app.set('models', { Ticket });

app.use('/tickets', ticketsRouter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

export { app, sequelize };
