import { DataTypes, Model, NOW, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Audit extends Model {
  public id!: number;
  public user_id!: number;
  public type!: string;
  public description!: string;

  public readonly created_at!: Date;
}

Audit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'audits',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

Audit.belongsTo(User, {foreignKey: 'user_id'});

export default Audit;