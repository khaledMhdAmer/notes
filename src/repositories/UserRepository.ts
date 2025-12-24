import { BaseRepository } from './BaseRepository';
import { User } from '../models';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.findOne({ where: { email } });
  }

  async findAllActive(): Promise<User[]> {
    return await this.findAll({
      where: {status},
      order: [['createdAt', 'DESC']],
    });
  }
}