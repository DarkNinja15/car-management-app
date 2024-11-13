import express from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import { createCar, getCars, getCar, updateCar, deleteCar, searchCars } from '../controllers/carController';
const router = express.Router();

router.post('/', authenticate, createCar);
router.get('/', authenticate, getCars);
router.get('/:id', authenticate, getCar);
router.put('/:id', authenticate, updateCar);
router.delete('/:id', authenticate, deleteCar);
router.get('/search', authenticate, searchCars);

export default router;