import { DataTypes, Model, NOW, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Note from './Note';

class NoteVersion extends Model {
  public id!: number;
  public user_id!: number;
  public note_id!: number;
  public title!: string;
  public description!: string;

  public readonly created_at!: Date;
}

NoteVersion.init(
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
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'note_versions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

NoteVersion.belongsTo(User, { foreignKey: 'user_id' });
NoteVersion.belongsTo(Note, { foreignKey: 'note_id' });
export default NoteVersion;