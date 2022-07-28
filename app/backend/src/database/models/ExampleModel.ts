import { Model } from 'sequelize';
import db from '.';

class Example extends Model {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

Example.init({
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default Example;
