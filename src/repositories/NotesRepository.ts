import { BaseRepository } from './BaseRepository';
import { Note } from '../models';

export class NotesRepository extends BaseRepository<Note> {
  constructor() {
    super(Note);
  }

  async findByAuthor(authorId: number): Promise<Note[]> {
    return await this.findAll({
      where: { author_id: authorId },
      order: [['created_at', 'DESC']],
    });
  }

  async findByStatus(statusId: number): Promise<Note[]> {
    return await this.findAll({
      where: { status_id: statusId },
      order: [['created_at', 'DESC']],
    });
  }

  async createNote(data: Partial<Note>): Promise<Note> {
    return await this.create(data);
  }
}
