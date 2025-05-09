import { Router, Request, Response } from 'express';
import libraryController from '../controllers/libraryController';

const libraryRouter = Router();

libraryRouter.get('/user/:user_id', async (req: Request, res: Response) => {
    try {
        await libraryController.getLibrary(req, res); 
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

libraryRouter.post('/add', async (req: Request, res: Response) => {
    try {
        await libraryController.addToLibrary(req, res);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
})

libraryRouter.delete('/delete', async (req: Request, res: Response) => {
    try {
        await libraryController.deleteFromLibrary(req, res);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
})

libraryRouter.put('/update/:id', async (req: Request, res: Response) => {
    try {
        await libraryController.updateLibrary(req, res);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
})

export default libraryRouter;