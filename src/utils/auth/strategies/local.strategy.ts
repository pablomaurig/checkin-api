import { Strategy } from 'passport-local';
import AuthService from '@services/auth.service';
const authService = new AuthService();

export const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await authService.getUser(email, password);

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
