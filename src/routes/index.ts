import { Router } from 'express';
import userRoutes from './users';
import authRoutes from './auth';
import notesRoutes from './notes';
const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/notes', notesRoutes);

export default router;