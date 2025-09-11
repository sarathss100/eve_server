import './config/envConfig/envConfig'; 
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).json('Server is up and Running');
});

export default app;
