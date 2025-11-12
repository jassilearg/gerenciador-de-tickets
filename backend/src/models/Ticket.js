import { DataTypes } from 'sequelize';

export default function TicketModel(sequelize) {
  return sequelize.define('Ticket', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    tipo_cliente: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'GRATUITO',
      validate: {
        isIn: [['GRATUITO', 'BASICO', 'PREMIUM']]
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'PENDENTE',
      validate: {
        isIn: [['PENDENTE', 'CLASSIFICADO']]
      }
    },
    urgencia_calculada: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        isIn: [['BAIXA', 'MEDIA', 'ALTA', 'CRITICA', null]]
      }
    }
  }, {
    tableName: 'tickets',
    timestamps: true
  });
}