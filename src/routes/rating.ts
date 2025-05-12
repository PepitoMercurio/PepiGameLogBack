import { Router, Request, Response } from 'express';
import ratingController from '../controllers/ratingController';

const ratingRouter = Router();

// Connexion
ratingRouter.get('/games/:game_id', async (req: Request, res: Response) => {
  try {
    await ratingController.getGameRating(req, res);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

ratingRouter.get('/user/:user_id', async (req: Request, res: Response) => {
  try {
    await ratingController.getUserRatings(req, res);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// Inscription
ratingRouter.post('/add', async (req: Request, res: Response) => {
    try {
        await ratingController.addRating(req, res);
  } catch (error: any) {
        res.status(500).send(error.message);
  }
});

ratingRouter.put('/update/:id', async (req: Request, res: Response) => {
    try {
        await ratingController.updateRating(req, res);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

ratingRouter.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        await ratingController.deleteRating(req, res); //delete Rating
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

export default ratingRouter;
