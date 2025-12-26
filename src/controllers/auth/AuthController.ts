import { Request, Response } from 'express';
import { AuthService } from '../../services/Auth/AuthService';
import { CreateUserDto, LoginDto } from './Auth.Dto';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response) => {
    
    try {
      const dto: CreateUserDto = req.body;
      const result = await this.authService.register(dto);
      res.status(201).json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const dto: LoginDto = req.body;
      const result = await this.authService.login(dto);
      res.status(200).json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  forgotPassword = (_req: Request, res: Response) => {
    res.status(501).json({ message: 'Forgot password is not implemented yet' });
  };

  logout = (_req: Request, res: Response) => {
    // Stateless JWT logout is handled client-side by discarding the token.
    res.status(200).json({ message: 'Logged out' });
  };

  private handleError(error: unknown, res: Response) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    res.status(400).json({ message });
  }
}