import { DataTypes, Model, NOW, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Session extends Model {
  public id!: number;
  public user_id!: number;
  public status!: string;
}

Session.init(
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
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'sessions',
    timestamps: false,
  }
);
Session.belongsTo(User, { foreignKey: 'user_id' });

export default Session;