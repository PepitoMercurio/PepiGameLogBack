import { Router, Request, Response } from 'express';
import authRouter from './auth';
import gamesRouter from './game';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

router.use('/auth', authRouter);

router.use('/games', gamesRouter);

//router.use('/library')

//router.use('/wishlist')

//router.use('/rating')



//router.use('/platform')

//router.use('/constructor')

//router.use('/images', );



//router.use('/age_rating')


export default router;