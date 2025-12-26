import { UserRepository } from '../../repositories/UserRepository';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../../controllers/Users/User.Dto';
import { User } from '../../models';
// import { getCachedJson, invalidateCacheKeys, setCachedJson } from '../../utils/cache';

// const ALL_USERS_CACHE_KEY = 'users:all';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    // const cached = await getCachedJson<UserResponseDto[]>(ALL_USERS_CACHE_KEY);
    // if (cached) {
    //   return cached;
    // }

    const users = await this.userRepository.findAll();
    const result = users.map(this.mapToResponseDto);
    // await setCachedJson(ALL_USERS_CACHE_KEY, result);
    return result;
  }

  async getUserById(id: number): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findById(id);
    return user ? this.mapToResponseDto(user) : null;
  }

  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    // Add business logic here (e.g., hash password, validate, etc.)
    
    const user = await this.userRepository.create(dto);
    // await this.invalidateUsersCache();
    return this.mapToResponseDto(user);
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<UserResponseDto | null> {
    const [affectedCount] = await this.userRepository.update(id, dto);
    
    if (affectedCount === 0) {
      return null;
    }

    const updatedUser = await this.userRepository.findById(id);
    if (updatedUser) {
      // await this.invalidateUsersCache();
      return this.mapToResponseDto(updatedUser);
    }

    return null;
  }

  async deleteUser(id: number): Promise<boolean> {
    const deletedCount = await this.userRepository.delete(id);
    if (deletedCount > 0) {
      // await this.invalidateUsersCache();
      return true;
    }

    return false;
  }

  private mapToResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  // private async invalidateUsersCache() {
  //   await invalidateCacheKeys([ALL_USERS_CACHE_KEY]);
  // }
}