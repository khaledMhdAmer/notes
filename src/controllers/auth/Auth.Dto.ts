export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  token: string;
  expiresIn: string;
}
