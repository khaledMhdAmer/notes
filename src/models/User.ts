import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Status from './Status';
import Role from './Role';
import Note from './Note';
import NoteDraft from './NoteDraft';
import NoteVersion from './NoteVersion';
import Session from './Session';
import Audit from './Audit';
import UserNote from './UserNote';
import NotePermission from './NotePermission';


class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public status!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);

// Define associations
User.belongsTo(Status, { foreignKey: 'status_id' });
User.belongsTo(Role, { foreignKey: 'role_id' });
User.hasMany(Note, { foreignKey: 'author_id' });
User.hasMany(NoteDraft, { foreignKey: 'user_id' });
User.hasMany(NoteVersion, { foreignKey: 'user_id' });
User.hasMany(Session, { foreignKey: 'user_id' });
User.hasMany(Audit, { foreignKey: 'user_id' });
User.belongsToMany(Note, { through: UserNote, foreignKey: 'user_id' });
User.belongsToMany(Note, { through: NotePermission, foreignKey: 'user_id', as: 'permittedNotes' });

export default User;