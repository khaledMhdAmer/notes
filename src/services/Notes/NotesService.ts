import { NotesRepository } from '../../repositories/NotesRepository';
import { CreateNoteDto, UpdateNoteDto, NoteResponseDto } from '../../controllers/Notes/Note.Dto';
import { Note } from '../../models';

export class NotesService {
  private notesRepository: NotesRepository;

  constructor() {
    this.notesRepository = new NotesRepository();
  }

  async createNote(dto: CreateNoteDto, authorId: number): Promise<NoteResponseDto> {
    const title = dto.title?.trim();

    if (!title) {
      throw new Error('Title is required');
    }

    const note = await this.notesRepository.createNote({
      title,
      status_id: dto.status_id || 1,
      author_id: authorId,
      current_version_id: 1, // Default version
    });

    return this.mapToResponseDto(note);
  }

  async getNoteById(id: number): Promise<NoteResponseDto | null> {
    const note = await this.notesRepository.findById(id);
    return note ? this.mapToResponseDto(note) : null;
  }

  async getAllNotes(): Promise<NoteResponseDto[]> {
    const notes = await this.notesRepository.findAll();
    return notes.map(note => this.mapToResponseDto(note));
  }

  async getNotesByAuthor(authorId: number): Promise<NoteResponseDto[]> {
    const notes = await this.notesRepository.findByAuthor(authorId);
    return notes.map(note => this.mapToResponseDto(note));
  }

  async updateNote(id: number, dto: UpdateNoteDto): Promise<NoteResponseDto | null> {
    if (dto.title !== undefined) {
      const title = dto.title?.trim();
      if (!title || title.length < 3) {
        throw new Error('Title must be at least 3 characters long');
      }
    }

    const [affectedCount] = await this.notesRepository.update(id, dto);

    if (affectedCount === 0) {
      return null;
    }

    const updatedNote = await this.notesRepository.findById(id);
    return updatedNote ? this.mapToResponseDto(updatedNote) : null;
  }

  async deleteNote(id: number): Promise<boolean> {
    const deletedCount = await this.notesRepository.delete(id);
    return deletedCount > 0;
  }

  private mapToResponseDto(note: any): NoteResponseDto {
    return {
      id: note.id,
      title: note.title,
      current_version_id: note.current_version_id,
      status_id: note.status_id,
      author_id: note.author_id,
      created_at: note.created_at,
      updated_at: note.updated_at,
    };
  }
}
