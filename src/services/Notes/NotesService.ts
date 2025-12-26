import { NotesRepository } from '../../repositories/NotesRepository';
import { CreateNoteDto, UpdateNoteDto, NoteResponseDto } from '../../controllers/Notes/Note.Dto';
import { Note } from '../../models';
// import { getCachedJson, invalidateCacheKeys, setCachedJson } from '../../utils/cache';

// const ALL_NOTES_CACHE_KEY = 'notes:all';

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
    // await this.invalidateNotesCache();
    return this.mapToResponseDto(note);
  }

  async getNoteById(id: number): Promise<NoteResponseDto | null> {
    const note = await this.notesRepository.findById(id);
    return note ? this.mapToResponseDto(note) : null;
  }

  async getAllNotes(): Promise<NoteResponseDto[]> {
    // const cached = await getCachedJson<NoteResponseDto[]>(ALL_NOTES_CACHE_KEY);
    // if (cached) {
    //   return cached;
    // }

    const notes = await this.notesRepository.findAll();
    const result = notes.map(note => this.mapToResponseDto(note));
    // await setCachedJson(ALL_NOTES_CACHE_KEY, result);
    return result;
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
    if (updatedNote) {
      // await this.invalidateNotesCache();
      return this.mapToResponseDto(updatedNote);
    }

    return null;
  }

  async deleteNote(id: number): Promise<boolean> {
    const deletedCount = await this.notesRepository.delete(id);
    if (deletedCount > 0) {
      // await this.invalidateNotesCache();
      return true;
    }

    return false;
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

  // private async invalidateNotesCache() {
  //   await invalidateCacheKeys([ALL_NOTES_CACHE_KEY]);
  // }
}
