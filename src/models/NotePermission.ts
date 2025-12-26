import { DataTypes, Model, NOW, Optional } from 'sequelize';
import sequelize from '../config/database';
import Note from './Note';
import User from './User';

class NotePermission extends Model {
  public id!: number;
  public note_id!: number;
  public user_id!: number;
}

NotePermission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    note_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'note_permissions',
    timestamps: false,
  }
);

NotePermission.belongsTo(Note, { foreignKey: 'note_id' });
NotePermission.belongsTo(User, { foreignKey: 'user_id' });
export default NotePermission;