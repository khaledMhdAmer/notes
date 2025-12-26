import bcrypt from 'bcryptjs';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { AuthRepository } from '../../repositories/AuthRepository';
import { AuthResponseDto, CreateUserDto, LoginDto } from '../../controllers/auth/Auth.Dto';
import { User } from '../../models';
import { config } from '../../config/environment';

type TokenPayload = { id: number; email: string };

export class AuthService {
  private authRepository: AuthRepository;
  private jwtSecret: string;
  private jwtExpiresIn: string;

  constructor() {
    this.authRepository = new AuthRepository();
    this.jwtSecret = config.jwt.secret;
    this.jwtExpiresIn = config.jwt.expiresIn;
  }

  async register(dto: CreateUserDto): Promise<AuthResponseDto> {
    const name = dto.name.trim();
    const email = dto.email.toLowerCase();
    const password = dto.password;
console.log("object");
    const existingUser = await this.authRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.authRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return this.buildAuthResponse(user);
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const email = dto.email ? this.normalizeEmail(dto.email) : '';
    const password = dto.password || '';

    this.ensureRequiredFields({ email, password });

    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    return this.buildAuthResponse(user);
  }

  validateToken(token: string): { valid: boolean; expired: boolean; payload?: JwtPayload } {
    try {
      const payload = jwt.verify(token, this.jwtSecret) as JwtPayload;
      return { valid: true, expired: false, payload };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return { valid: false, expired: true };
      }
      return { valid: false, expired: false };
    }
  }

  private buildAuthResponse(user: User): AuthResponseDto {
    const token = this.generateToken({ id: user.id, email: user.email });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      token,
      expiresIn: this.jwtExpiresIn,
    };
  }

  private generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.jwtSecret);
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private ensureRequiredFields(fields: Record<string, string | undefined>): void {
    const missing = Object.entries(fields)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }
  }

  private assertPasswordStrength(password: string): void {
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
  }
}