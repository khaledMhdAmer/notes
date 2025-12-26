import { DataTypes, Model, NOW, Optional } from 'sequelize';
import sequelize from '../config/database';
import Media from './Media';
import Note from './Note';

class NoteMedia extends Model {
  public id!: number;
  public media_id!: number;
  public note_id!: number;
}

NoteMedia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    media_id: {
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
    tableName: 'note_media',
    timestamps: false,
  }
);

NoteMedia.belongsTo(Media, { foreignKey: 'media_id' });
NoteMedia.belongsTo(Note, { foreignKey: 'note_id' });
export default NoteMedia;