import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET!;

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) 
        return res.sendStatus(401);

    const token = authHeader && authHeader.split(' ')[1];
    try {
        const decoded_id = jwt.verify(token, secretKey);

        const user = await User.findById(decoded_id);
        if (!user) return res.sendStatus(401);

        req.user = user;
    } catch (error) {
        return res.sendStatus(401);
    }

    next();
}

export default authenticateToken;