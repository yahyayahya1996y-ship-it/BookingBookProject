import type { User, UserRole } from '../types/User';
import { fakeUsers } from '../data/fakeUsers';
import { storageService } from './storageService';
import { token } from '../utils/token';

const AUTH_USER_KEY = 'booking_book_user';
const AUTH_TOKEN_KEY = 'booking_book_token';

export const authService = {
  login: (username: string, password: string): { user: User; token: string } | null => {
    // Find active user by username and password
    const user = fakeUsers.find(
      (u) => u.username === username && u.password === password && u.isActive
    );

    if (!user) {
      return null;
    }

    // Create token
    const authToken = token.createToken(user);

    // Save user and token to localStorage
    storageService.setItem(AUTH_USER_KEY, user);
    storageService.setItem(AUTH_TOKEN_KEY, authToken);

    return { user, token: authToken };
  },

  logout: (): void => {
    storageService.removeItem(AUTH_USER_KEY);
    storageService.removeItem(AUTH_TOKEN_KEY);
  },

  getCurrentUser: (): User | null => {
    const storedUser = storageService.getItem<User>(AUTH_USER_KEY);
    const storedToken = storageService.getItem<string>(AUTH_TOKEN_KEY);

    if (!storedUser || !storedToken) {
      return null;
    }

    // Check if token is expired
    if (token.isTokenExpired(storedToken)) {
      authService.logout();
      return null;
    }

    // Check if token is valid for the user
    if (!token.isTokenValidForUser(storedToken, storedUser)) {
      authService.logout();
      return null;
    }

    return storedUser;
  },

  getToken: (): string | null => {
    return storageService.getItem<string>(AUTH_TOKEN_KEY);
  },

  isAuthenticated: (): boolean => {
    return authService.getCurrentUser() !== null;
  },

  hasRole: (role: UserRole): boolean => {
    const user = authService.getCurrentUser();
    return user !== null && user.role === role;
  },
};
