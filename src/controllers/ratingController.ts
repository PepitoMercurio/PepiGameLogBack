import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

const prisma = new PrismaClient();
dotenv.config();

const ratingController = {
    getGameRating: async (req: Request, res: Response) => {
        const game_id = parseInt(req.params.game_id)

        try {
            const rating = await prisma.rating.findMany({
                where: {
                    game_id: game_id
                }
            })

            const formattedRating = rating.map(rate => ({
                ...rate,
                id: parseInt(rate.id.toString()),
                game_id: parseInt(rate.game_id.toString()),
                user_id: parseInt(rate.user_id.toString()),
            }));

            return res.status(200).json({
                rating: formattedRating,
            });
        } catch (error) {
            console.error('Error during getting games ratings:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    getUserRatings: async (req: Request, res: Response) => {
        const user_id = parseInt(req.params.user_id)

        try {
            const rating = await prisma.rating.findMany({
                where: {
                    user_id: user_id
                }
            })

            const formattedRating = rating.map(rate => ({
                ...rate,
                id: parseInt(rate.id.toString()),
                game_id: parseInt(rate.game_id.toString()),
                user_id: parseInt(rate.user_id.toString()),
            }));

            return res.status(200).json({
                rating: formattedRating,
            });
        } catch (error) {
            console.error('Error during getting user\'s games ratings:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    addRating: async (req: Request, res: Response) => {
        const data = req.body;

        try {
            const rating = await prisma.rating.create({
                data
            })

            return res.status(201).json({ message: 'Game\'s rating successfully added'})
        } catch (error) {
            console.error('Error during adding rate into rating', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateRating: async (req: Request, res: Response) => {
        const data = req.body;
        const id = parseInt(req.params.id, 10);
    
        try {
            const rating = await prisma.rating.update({
                where: {
                    id: id,
                },
                data,
            });
    
            const ratingJson = {
                ...rating,
                id: parseInt(rating.id.toString()),
                user_id: parseInt(rating.user_id.toString()),
                game_id: parseInt(rating.game_id.toString())
            };
    
            res.status(200).json({ message: 'Game updated successfully', rating: ratingJson });
        } catch (error) {
            console.error('Error during updating a game:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteRating: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
    
        try {
            const rating = await prisma.rating.delete({
                where: {
                    id: id
                }
            })
    
            res.status(200).json({ message: 'Rate deleted successfully' });
        } catch (error) {
            console.error('Error during deleting a rate:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
}

export default ratingController