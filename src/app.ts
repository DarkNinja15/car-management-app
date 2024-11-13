import express from 'express';
import authRoutes from './routes/authRoute';
import carRoutes from './routes/carRoute';
import multer from 'multer';

const app = express();
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.use('/api/auth', authRoutes);
app.use('/api/cars', upload.array('images', 10), carRoutes);

export default app;