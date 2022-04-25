import passport from 'passport';
import { LocalStrategy } from '@utils/auth/strategies/local.strategy';
import { JwtStrategy } from '@utils/auth/strategies/jwt.strategy';

passport.use(LocalStrategy);
passport.use(JwtStrategy);
