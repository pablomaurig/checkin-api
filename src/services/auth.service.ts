import boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { comparePassword, hashPassword } from '@utils/hash';
import UserService from '@services/user.service';
import { config } from '@config/config';
import { User } from '../types/user.types';

const userService = new UserService();

interface MailInfo {
  from: string;
  to: string;
  subject: string;
  html: string;
}

class AuthService {
  async getUser(email: string, password: string) {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await comparePassword(password, user.password as string);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.password;
    delete user.recoveryToken;

    return user;
  }

  signToken(user: User) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);

    return {
      user,
      token,
    };
  }

  async sendRecovery(email: string) {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `${config.recoveryUrl}${token}`;
    await userService.updateUser(user.id, { recoveryToken: token });
    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: 'Email para recuperar contraseña',
      html: `<b>Ingresa a este link => ${link}</b>`,
    };
    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail: MailInfo) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  }

  async changePassword(token: string, newPassword: string) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await userService.getUserById(
        parseInt(payload.sub as string)
      );
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await hashPassword(newPassword);
      await userService.updateUser(user.id, {
        recoveryToken: null,
        password: hash,
      });

      return {
        message: 'La contraseña fue cambiada con éxito',
      };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}

export default AuthService;
