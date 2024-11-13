import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: any, res: any, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        req.userId = decoded.id;
        next();
    });
};
