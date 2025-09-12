import './config/envConfig/envConfig'; 
import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import corsOptions from './utils/corsOptions';
import router from './routes/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json('Server is up and Running');
});

export default app;
