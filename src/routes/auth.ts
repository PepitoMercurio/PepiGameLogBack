import { Router, Request, Response } from 'express';
import authController from '../controllers/authController';

const authRouter = Router();

// Connexion
authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    await authController.login(req, res);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// Inscription
authRouter.post('/register', async (req: Request, res: Response) => {
    try {
        await authController.register(req, res);
  } catch (error: any) {
        res.status(500).send(error.message);
  }
});

export default authRouter;
