import { Router } from 'express';
import userRoutes from './users';
import authRoutes from './auth';
const router = Router();

router.use('/users', userRoutes);
// Add more routes here
router.use('/auth/', authRoutes);
// router.use('/products', productRoutes);

export default router;