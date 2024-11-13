import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCar = async (req: any, res: any) => {
    const { title, description, tags } = req.body;
    const images = req.files.map((file: any) => file.path);

    try {
        const car = await prisma.car.create({
            data: { title, description, tags, images, userId: req.userId }
        });
        res.status(201).json(car);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Error creating car' });
    }
};

export const getCars = async (req: any, res: any) => {
    const cars = await prisma.car.findMany({ where: { userId: req.userId } });
    res.json(cars);
};

export const getCar = async (req: any, res: any) => {
    const car = await prisma.car.findUnique({ where: { id: parseInt(req.params.id) } });
    if (car?.userId === req.userId) {
        res.json(car);
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};

export const updateCar = async (req: any, res: any) => {
    const { title, description, tags } = req.body;
    const images = req.files?.map((file: any) => file.path);

    const car = await prisma.car.update({
        where: { id: parseInt(req.params.id), userId: req.userId },
        data: { title, description, tags, images }
    });
    res.json(car);
};

export const deleteCar = async (req: any, res: any) => {
    await prisma.car.delete({ where: { id: parseInt(req.params.id), userId: req.userId } });
    res.json({ message: 'Car deleted' });
};

export const searchCars = async (req: any, res: any) => {
    const { query } = req.query;
    const cars = await prisma.car.findMany({
        where: {
            userId: req.userId,
            OR: [
                { title: { contains: query as string } },
                { description: { contains: query as string } },
                { tags: { string_contains: query as string } }
            ]
        }
    });
    res.json(cars);
};