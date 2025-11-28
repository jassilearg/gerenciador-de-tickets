import { DataTypes } from 'sequelize';

export default function TicketModel(sequelize) {
  return sequelize.define('Ticket', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tipo_categoria: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Vendas', 'Financeiro', 'Tecnico', 'Suporte']]
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pendente',
      validate: {
        isIn: [['Pendente', 'Classificado', 'Deletado']]
      }
    },
    prioridade: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Baixa',
      validate: {
        isIn: [['Baixa', 'Media', 'Alta', 'Critica']]
      }
    },
  }, {
    tableName: 'tickets',
    timestamps: true
  });
}
