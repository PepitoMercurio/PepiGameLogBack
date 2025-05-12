import { Router, Request, Response } from 'express';
import dashboardController from '../controllers/dashboardController';

const dashboardRouter = Router();

dashboardRouter.get('/data', async (req: Request, res: Response) => {
  try {
    await dashboardController.getDashboard(req, res);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

dashboardRouter.get('/user/:user_id', async (req: Request, res: Response) => {
  try {
    await dashboardController.getUserDashboard(req, res);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default dashboardRouter;
