import { compare } from 'bcryptjs';
import IUser from '../Interfaces/IUser';

class ValidationLogin {
  validateUser = async (user: IUser | null): Promise<boolean> => {
    if (user) return true;
    return false;
  };

  validatePassword = async (password: string, userpassword: string): Promise<boolean> => {
    const isValidePAssword = compare(password, userpassword);
    return isValidePAssword;
  };
}

export default ValidationLogin;
