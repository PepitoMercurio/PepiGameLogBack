import { Router, Request, Response } from 'express';
import wishlistController from '../controllers/wishlistController';

const wishlistRouter = Router();

wishlistRouter.get('/user/:user_id', async (req: Request, res: Response) => {
    try {
        await wishlistController.getwishlist(req, res); 
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

wishlistRouter.post('/add', async (req: Request, res: Response) => {
    try {
        await wishlistController.addTowishlist(req, res);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
})

wishlistRouter.delete('/delete', async (req: Request, res: Response) => {
    try {
        await wishlistController.deleteFromwishlist(req, res);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
})

export default wishlistRouter;