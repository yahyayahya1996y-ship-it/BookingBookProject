import type { User } from "../types/User";

export const fakeUsers: User[] = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    fullName: "System Admin",
    role: "admin",
    securityStamp: "admin-security-stamp-001",
    isActive: true,
    createdAt: "2026-05-20T08:00:00.000Z",
  },
  {
    id: 2,
    username: "yahya",
    password: "user123",
    fullName: "Yahya Yahya",
    role: "user",
    securityStamp: "user-security-stamp-002",
    isActive: true,
    createdAt: "2026-05-20T08:10:00.000Z",
  },
  {
    id: 3,
    username: "student",
    password: "user123",
    fullName: "Student User",
    role: "user",
    securityStamp: "user-security-stamp-003",
    isActive: true,
    createdAt: "2026-05-20T08:20:00.000Z",
  },
];