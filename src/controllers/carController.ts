
import { PrismaClient } from '@prisma/client';
import cloudinary from '../config/cloudinaryConfig';
import { UploadedFile } from 'express-fileupload';

const prisma = new PrismaClient();

export const createCar = async (req: any, res: any) => {
    const { title, description, tags } = req.body;
    const userId = req.userId;
    const files = req.files?.images;

    try {
        // Upload images to Cloudinary
        const imageUrls: string[] = [];
        if (files) {
            const images = Array.isArray(files) ? files : [files];
            for (const file of images) {
                const result = await cloudinary.uploader.upload((file as UploadedFile).tempFilePath);
                imageUrls.push(result.secure_url);
            }
        }

        const car = await prisma.car.create({
            data: {
                title,
                description,
                tags,
                images: imageUrls,
                userId
            }
        });

        res.status(201).json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating car' });
    }
};

export const updateCar = async (req: any, res: any) => {
    const { title, description, tags } = req.body;
    const carId = parseInt(req.params.id);
    const files = req.files?.images;

    try {
        // Upload new images to Cloudinary if provided
        const imageUrls: string[] = [];
        if (files) {
            const images = Array.isArray(files) ? files : [files];
            for (const file of images) {
                const result = await cloudinary.uploader.upload((file as UploadedFile).tempFilePath);
                imageUrls.push(result.secure_url);
            }
        }

        const car = await prisma.car.update({
            where: { id: carId, userId: req.userId },
            data: {
                title,
                description,
                tags,
                images: imageUrls.length > 0 ? imageUrls : undefined
            }
        });

        res.json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating car' });
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
