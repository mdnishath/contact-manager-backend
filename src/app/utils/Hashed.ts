import * as crypto from 'crypto';
import { promisify } from 'util';

// const randomBytesAsync = promisify(crypto.randomBytes);
const pbkdf2Async = promisify(crypto.pbkdf2);

export class Hashed {
  static async hashPassword(password: string, salt: string): Promise<string> {
    const hashedPasswordBuffer = await pbkdf2Async(password, salt, 10000, 32, 'sha256');
    const hashedPassword = hashedPasswordBuffer.toString('hex');
    return hashedPassword;
  }

  static async verifyPassword(
    password: string,
    hashedPassword: string,
    salt: string,
  ): Promise<boolean> {
    const newlyHashedPasswordBuffer = await pbkdf2Async(password, salt, 10000, 32, 'sha256');
    const newlyHashedPassword = newlyHashedPasswordBuffer.toString('hex');
    return hashedPassword === newlyHashedPassword;
  }
}
