import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../services/Users/UserService';
import { CreateUserDto, UpdateUserDto } from './User.Dto';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userService.getUserById(id);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: CreateUserDto = req.body;
      const user = await this.userService.createUser(dto);

      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const dto: UpdateUserDto = req.body;
      const user = await this.userService.updateUser(id, dto);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.userService.deleteUser(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}