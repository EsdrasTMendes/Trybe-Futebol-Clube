import { compare } from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import ILogin from '../Interfaces/ILogin';
import IUser from '../Interfaces/IUser';
import HttpError from '../utils/httpError';
import User from '../database/models/UserModel';
import GenerateToken from '../utils/authentication';

class serviceUser {
  login = async (payload: ILogin): Promise<object> => {
    const user = await User.findOne({
      attributes: ['username', 'email', 'password', 'role'],
      where: { email: payload.email },
    });
    if (!user) throw new HttpError(401, 'Incorrect email or password');
    if (user) {
      const isValidPassword = await compare(payload.password, user.password);
      if (!isValidPassword) throw new HttpError(400, 'Senha inválida');
    }
    const jwtHeader: Omit<IUser, 'password'> = {
      username: user.getDataValue('username'),
      email: user.getDataValue('email'),
      role: user.getDataValue('role'),
    };
    const tokengenerate = new GenerateToken();
    const token = await tokengenerate.generateToken(jwtHeader);
    return { token };
  };

  verifyAutentication = async (token: string) => {
    const validateToken = new GenerateToken();
    const result = await validateToken.authenticateToken(token);
    return result as JwtPayload;
  };
}

export default serviceUser;
