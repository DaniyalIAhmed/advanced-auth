import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db';
import authRoutes from './routes/auth.route';

dotenv.config();
const app = express();
const port = process.env.PORT || 58475;
app.use(cookieParser());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});
app.use("/api/v1/auth", authRoutes);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  connectDB();
});