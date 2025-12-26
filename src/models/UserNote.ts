import { DataTypes, Model, NOW, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Note from './Note';

class UserNote extends Model {
  public id!: number;
  public user_id!: number;
  public note_id!: number;
}

UserNote.init(
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
    note_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'user_notes',
    timestamps: false,
  }
);

UserNote.belongsTo(User, { foreignKey: 'user_id' });
UserNote.belongsTo(Note, { foreignKey: 'note_id' });

export default UserNote;