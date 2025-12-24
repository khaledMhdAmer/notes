import { UserRepository } from '../../repositories/UserRepository';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../../controllers/Users/User.Dto';
import { User } from '../../models';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(this.mapToResponseDto);
  }

  async getUserById(id: number): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findById(id);
    return user ? this.mapToResponseDto(user) : null;
  }

  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    // Add business logic here (e.g., hash password, validate, etc.)
    const user = await this.userRepository.create(dto);
    return this.mapToResponseDto(user);
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<UserResponseDto | null> {
    const [affectedCount] = await this.userRepository.update(id, dto);
    
    if (affectedCount === 0) {
      return null;
    }

    const updatedUser = await this.userRepository.findById(id);
    return updatedUser ? this.mapToResponseDto(updatedUser) : null;
  }

  async deleteUser(id: number): Promise<boolean> {
    const deletedCount = await this.userRepository.delete(id);
    return deletedCount > 0;
  }

  private mapToResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}