import { DataTypes, Model, NOW, Optional } from 'sequelize';
import sequelize from '../config/database';

class Tag extends Model {
  public id!: number;
  public name!: string;
}

Tag.init(
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
    tableName: 'tags',
    timestamps: false,
  }
);

export default Tag;