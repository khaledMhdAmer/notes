import { BaseRepository } from './BaseRepository';
import { User } from '../models';

export class AuthRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.findOne({ where: { email } });
  }

  async createUser(data: Partial<User>): Promise<User> {
    return await this.create(data);
  }

  async findAllActive(): Promise<User[]> {
    return await this.findAll({
      where: { status: true },
      order: [['createdAt', 'DESC']],
    });
  }
}