import { Strategy } from 'passport-local';
import boom from '@hapi/boom';
import UsersService from '@services/user.service';
import { comparePassword } from '@utils/hash';

const service = new UsersService();

export const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await service.getUserByEmail(email);
      if (!user) done(boom.unauthorized(), false);
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) done(boom.unauthorized(), false);
      // @ts-expect-error: revisar este type
      delete user.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
