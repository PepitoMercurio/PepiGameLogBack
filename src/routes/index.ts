import { Router, Request, Response } from 'express';
import authRouter from './auth';
import gamesRouter from './game';
import libraryRouter from './library';
import wishlistRouter from './wishlist';
import ratingRouter from './rating';
import dashboardRouter from './dashboard';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

router.use('/auth', authRouter);

router.use('/games', gamesRouter);

router.use('/library', libraryRouter)

router.use('/wishlist', wishlistRouter)

router.use('/rating', ratingRouter)

router.use('/dashboard', dashboardRouter)


//router.use('/platform')

//router.use('/constructor')

//router.use('/images', );



//router.use('/age_rating')


export default router;