import { DataTypes, Model, NOW, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Role extends Model {
  public id!: number;
  public name!: string;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'roles',
    timestamps: false,
  }
);
Role.hasMany(User, {foreignKey: 'user_id'});

export default Role;