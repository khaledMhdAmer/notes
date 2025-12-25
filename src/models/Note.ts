import { DataTypes, Model, NOW, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Status from './Status';
import NoteVersion from './NoteVersion';
import NoteDraft from './NoteDraft';
import UserNote from './UserNote';
import NotePermission from './NotePermission';
import Media from './Media';
import NoteMedia from './NoteMedia';

class Note extends Model {
  public id!: number;
  public title!: string;
  public current_version_id!: number;
  public status_id!: string;
  public author_id!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    current_version_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    status_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    created_at: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: Date.now()
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    }

  },
  {
    sequelize,
    tableName: 'notes',
    timestamps: true,
  }
);
Note.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
Note.belongsTo(Status, { foreignKey: 'status_id' });
Note.belongsTo(NoteVersion, { foreignKey: 'current_version_id', as: 'currentVersion' });
Note.hasMany(NoteDraft, { foreignKey: 'note_id' });
Note.hasMany(NoteVersion, { foreignKey: 'note_id' });
Note.belongsToMany(User, { through: UserNote, foreignKey: 'note_id' });
Note.belongsToMany(User, { through: NotePermission, foreignKey: 'note_id', as: 'permittedUsers' });
Note.belongsToMany(Media, { through: NoteMedia, foreignKey: 'note_id' });

export default Note;