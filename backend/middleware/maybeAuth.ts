import {NextFunction, Response} from 'express';
import User from '../models/User';
import {RequestWithUser} from './auth';


const maybeAuth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const headerValue = req.get('Authorization');
  if (headerValue) {
    const [_bearer, token] = headerValue.split(' ');
    if (token) {
      const user = await User.findOne({token});
      if (user) {
        req.user = user;
      }
    }
  }
  return next();
};

export default maybeAuth;