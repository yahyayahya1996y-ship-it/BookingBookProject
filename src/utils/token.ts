import type { TokenPayload } from '../types/Auth';
import type { User } from '../types/User';

const TOKEN_DURATION_MS = 2 * 60 * 60 * 1000; // 2 hours

export const token = {
  createToken: (user: User): string => {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + TOKEN_DURATION_MS);

    const payload: TokenPayload = {
      userId: user.id,
      username: user.username,
      role: user.role,
      securityStamp: user.securityStamp,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    };

    return btoa(JSON.stringify(payload));
  },

  decodeToken: (encodedToken: string): TokenPayload | null => {
    try {
      const decoded = atob(encodedToken);
      return JSON.parse(decoded) as TokenPayload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  },

  isTokenExpired: (encodedToken: string): boolean => {
    const payload = token.decodeToken(encodedToken);
    if (!payload) return true;

    const expiresAt = new Date(payload.expiresAt);
    return new Date() > expiresAt;
  },

  isTokenValidForUser: (encodedToken: string, user: User): boolean => {
    const payload = token.decodeToken(encodedToken);
    if (!payload) return false;

    // Check if token has expired
    if (token.isTokenExpired(encodedToken)) return false;

    // Validate user info matches
    if (payload.userId !== user.id || payload.username !== user.username) {
      return false;
    }

    // Validate security stamp matches
    if (payload.securityStamp !== user.securityStamp) {
      return false;
    }

    return true;
  },
};
