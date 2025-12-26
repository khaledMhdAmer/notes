import { Router } from 'express';
import { NotesController } from '../controllers/Notes/NotesController';
import { authenticate } from '../middlewares/auth';
import { checkNoteOwnership } from '../middlewares/noteOwnership';

const router = Router();
const notesController = new NotesController();

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     description: Creates a new note with title and optional content
 *     tags: [Notes]
 */
router.post('/', authenticate, notesController.createNote);

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get all notes
 *     description: Retrieves all notes
 *     tags: [Notes]
 */
router.get('/', authenticate, notesController.getAllNotes);

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get note by ID
 *     description: Retrieves a single note by its ID
 *     tags: [Notes]
 */
router.get('/:id', authenticate, notesController.getNoteById);

/**
 * @swagger
 * /api/notes/author/{authorId}:
 *   get:
 *     summary: Get notes by author
 *     description: Retrieves all notes created by a specific author
 *     tags: [Notes]
 */
router.get('/author/:authorId', authenticate, notesController.getNotesByAuthor);

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update note
 *     description: Updates an existing note
 *     tags: [Notes]
 */
router.put('/:id', authenticate, checkNoteOwnership, notesController.updateNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete note
 *     description: Deletes a note by its ID
 *     tags: [Notes]
 */
router.delete('/:id', authenticate, checkNoteOwnership, notesController.deleteNote);

export default router;
