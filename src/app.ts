import './config/envConfig/envConfig'; 
import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import corsOptions from './utils/corsOptions';
import router from './routes/routes';
import WebhookController from './controllers/webhook/WebhookController';

const app = express();

const webhookController = new WebhookController();

app.post(
  '/api/v1/webhook',
  express.raw({ type: 'application/json' }),
  webhookController.stripeWebhook.bind(webhookController)
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));


app.use(express.json());

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json('Server is up and Running');
});

export default app;