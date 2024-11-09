import { Types } from 'mongoose';
import { IUser } from '../../models/User';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
            id?: Types.ObjectId;
        }
    }
}