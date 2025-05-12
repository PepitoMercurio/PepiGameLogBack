import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.CORS,
  credentials: true
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenue sur l\'API PepiGameLog !');
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
