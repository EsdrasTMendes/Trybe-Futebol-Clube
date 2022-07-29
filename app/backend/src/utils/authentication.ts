import { SignOptions, verify, sign } from 'jsonwebtoken';
import ILogin from '../Interfaces/ILogin';
import HttpError from './httpError';

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

const config: SignOptions = {
  expiresIn: '1h',
};

export default class GenerateToken {
  constructor(private jwtConfig: SignOptions = config) {}

  public generateToken = (payload: Omit<ILogin, 'password'>) =>
    sign(payload, SECRET, this.jwtConfig);

  public authenticateToken = async (token:string) => {
    if (!token) {
      throw new HttpError(401, 'Token não encontrado');
    }

    try {
      const tokenIntrospection = verify(token, SECRET, this.jwtConfig);
      return tokenIntrospection;
    } catch (error) {
      throw new HttpError(401, 'Token inválido');
    }
  };
}
