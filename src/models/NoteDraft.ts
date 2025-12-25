import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Note from './Note';
import User from './User';

class NoteDraft extends Model {
  public id!: number;
  public noteId!: number | null;
  public desc!: string;
  public userId!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

NoteDraft.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    noteId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'note_id',
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
  },
  {
    sequelize,
    tableName: 'note_drafts',
    timestamps: true,
  }
);

NoteDraft.belongsTo(Note, { foreignKey: 'note_id' });
NoteDraft.belongsTo(User, { foreignKey: 'user_id' });

export default NoteDraft;