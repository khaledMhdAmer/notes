// routes/auth.ts
import { Router } from 'express';
import {AuthController} from '../controllers/auth/AuthController';

const router = Router();
const authController = new AuthController();


/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.post('/register', authController.register);

// POST /auth/login
router.post('/login', authController.login);

// POST /auth/logout
router.post('/logout',authController.logout);

export default router;