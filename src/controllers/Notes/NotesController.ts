import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth';
import { NotesService } from '../../services/Notes/NotesService';
import { CreateNoteDto, UpdateNoteDto } from './Note.Dto';

export class NotesController {
  private notesService: NotesService;

  constructor() {
    this.notesService = new NotesService();
  }

  createNote = async (req: AuthRequest, res: Response) => {
    try {
      const dto: CreateNoteDto = req.body;
      const authorId = req.user!.id;
      const result = await this.notesService.createNote(dto, authorId);
      res.status(201).json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getNoteById = async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const result = await this.notesService.getNoteById(id);
      
      if (!result) {
        res.status(404).json({ message: 'Note not found' });
        return;
      }

      res.status(200).json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllNotes = async (_req: AuthRequest, res: Response) => {
    try {
      const result = await this.notesService.getAllNotes();
      res.status(200).json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getNotesByAuthor = async (req: AuthRequest, res: Response) => {
    try {
      const authorId = parseInt(req.params.authorId);
      const result = await this.notesService.getNotesByAuthor(authorId);
      res.status(200).json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  updateNote = async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const dto: UpdateNoteDto = req.body;
      const result = await this.notesService.updateNote(id, dto);

      if (!result) {
        res.status(404).json({ message: 'Note not found' });
        return;
      }

      res.status(200).json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  deleteNote = async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const result = await this.notesService.deleteNote(id);

      if (!result) {
        res.status(404).json({ message: 'Note not found' });
        return;
      }

      res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  private handleError(error: unknown, res: Response) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    res.status(400).json({ message });
  }
}
