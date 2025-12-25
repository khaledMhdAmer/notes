import { DataTypes, Model, NOW, Optional } from 'sequelize';
import sequelize from '../config/database';
import Note from './Note';
import NoteMedia from './NoteMedia';

class Media extends Model {
  public id!: number;
  public path!: string;
  public name!: string;
}

Media.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'media',
    timestamps: false,
  }
);
Media.belongsToMany(Note, { through: NoteMedia, foreignKey: 'media_id' });

export default Media;