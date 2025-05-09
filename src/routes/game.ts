import { Router, Request, Response } from 'express';
import gameController from '../controllers/gameController';

const gamesRouter = Router();

// Connexion
gamesRouter.get('/get', async (req: Request, res: Response) => {
  try {
    await gameController.getGame(req, res);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

gamesRouter.get('/get/:id', async (req: Request, res: Response) => {
  try {
    await gameController.getOneGame(req, res);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// Inscription
gamesRouter.post('/add', async (req: Request, res: Response) => {
    try {
        await gameController.addGame(req, res);
  } catch (error: any) {
        res.status(500).send(error.message);
  }
});

gamesRouter.put('/update/:id', async (req: Request, res: Response) => {
    try {
        await gameController.updateGame(req, res);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

gamesRouter.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        await gameController.deleteGame(req, res);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

gamesRouter.get('/count', async (req: Request, res: Response) => {
    try {
        await gameController.countGames(req, res); 
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

export default gamesRouter;
