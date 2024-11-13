import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const register = async (req: any, res: any) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: { email, password: hashedPassword }
        });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: 'User already exists' });
    }
};

export const login = async (req: any, res: any) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
};