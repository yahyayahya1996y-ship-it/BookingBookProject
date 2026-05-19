import type { User, UserRole } from "./User";

export interface TokenPayload {
  userId: number;
  username: string;
  role: UserRole;
  securityStamp: string;
  createdAt: string;
  expiresAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}