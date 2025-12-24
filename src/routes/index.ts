import { Router } from 'express';
import userRoutes from './users';

const router = Router();

router.use('/users', userRoutes);
// Add more routes here
// router.use('/products', productRoutes);

export default router;