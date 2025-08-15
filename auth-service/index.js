import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import './services/strategies';
import authRoutes from './routes/auth'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN
const MONGO_URI = process.env.MONGODB_CONN_STRING

app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
}));
app.use(passport.initialize());
app.use

mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error: ', err);
    process.exit(1);
});

app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));

