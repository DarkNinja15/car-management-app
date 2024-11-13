import express from 'express';
import fileUpload from 'express-fileupload';
import authRoutes from './routes/authRoute';
import carRoutes from './routes/carRoute';

const app = express();
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

export default app;
