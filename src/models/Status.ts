import { DataTypes, Model, NOW, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Note from './Note';

class Status extends Model{
  public id!: number;
  public name!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}
Status.init(
  {
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },{
    sequelize,
    tableName: 'note_drafts',
    timestamps: true,
  }
);

Status.hasMany(User, { foreignKey: 'status_id' });
Status.hasMany(Note, { foreignKey: 'status_id' });
export default Status;