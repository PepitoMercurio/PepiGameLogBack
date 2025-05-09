import { Router, Request, Response } from 'express';
import authRouter from './auth';


const router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

router.use('/auth', authRouter);

// router.use('/images', );

export default router;