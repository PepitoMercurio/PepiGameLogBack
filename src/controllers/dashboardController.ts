import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

const prisma = new PrismaClient();
dotenv.config();

const dashboardController = {
    getDashboard: async (req: Request, res: Response) => {
        try {
            const countGames = await prisma.games.count();
            const countRates = await prisma.rating.count();

            const data = {
                numberGames: countGames,
                numberRating: countRates
            }

            res.status(200).json(data)
        } catch (error) {
            console.error('Error during getting dashboard:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    getUserDashboard: async (req: Request, res: Response) => {
        const user_id = parseInt(req.params.user_id, 10);

        try {
            const countLibrary = await prisma.library.count({
                where: {
                    user_id: user_id,
                }
            });

            const countRates = await prisma.rating.count({
                where: {
                    user_id: user_id,
                }
            });

            const countWish = await prisma.wishlist.count({
                where: {
                    user_id: user_id,
                }
            });

            const data = {
                numberLibrary: countLibrary,
                numberRating: countRates,
                numberWish: countWish
            }

            res.status(200).json(data)
        } catch (error) {
            console.error('Error during getting dashboard:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
}

export default dashboardController;