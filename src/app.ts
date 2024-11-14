import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import authRoutes from './routes/authRoute';
import carRoutes from './routes/carRoute';

const app = express();
const corsOptions = {
  origin: '*', // Allow specific origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

export default app;
