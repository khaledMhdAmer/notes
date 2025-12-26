import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { NotesRepository } from '../repositories/NotesRepository';

export const checkNoteOwnership = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const noteId = parseInt(req.params.id);
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    if (isNaN(noteId)) {
      res.status(400).json({ message: 'Invalid note ID' });
      return;
    }

    const notesRepository = new NotesRepository();
    const note = await notesRepository.findById(noteId);

    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    if (note.author_id !== userId) {
      res.status(403).json({ message: 'You can only edit your own notes' });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error verifying note ownership' });
  }
};
