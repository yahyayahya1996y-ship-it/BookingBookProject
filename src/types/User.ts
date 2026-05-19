export type UserRole = "admin" | "user";

export interface User {
  id: number;
  username: string;
  password: string;
  fullName: string;
  role: UserRole;
  securityStamp: string;
  isActive: boolean;
  createdAt: string;
}