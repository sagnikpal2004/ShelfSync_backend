import { Request, Response, NextFunction } from 'express';
import User  from '../models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET!;

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) 
        return res.sendStatus(401);

    const token = authHeader && authHeader.split(' ')[1];
    try {
        const decoded_id = jwt.verify(token, secretKey) as JwtPayload;

        const user = await User.findById(decoded_id.id);
        if (!user) return res.sendStatus(401);

        req.user = user;
    } catch (error) {
        return res.status(403).send((error as Error).message);
    }

    next();
}

export default authenticateToken;