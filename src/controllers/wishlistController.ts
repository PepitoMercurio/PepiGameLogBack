import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

const prisma = new PrismaClient();
dotenv.config();

const wishlistController = {
    getwishlist: async (req: Request, res: Response) => {
        const user_id = parseInt(req.params.user_id)

        try {
            const wishlist = await prisma.wishlist.findMany({
                where: {
                    user_id: user_id 
                }
            });
            return res.status(200).json({
                wishlist: wishlist,
            });
        } catch (error) {
            console.error('Error during getting user\'s wishlist:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    addTowishlist: async (req: Request, res: Response) => {
        const data = req.body;

        try {
            const wishlist = await prisma.wishlist.create({
                data
            })

            return res.status(201).json({ message: 'Game successfully added to user\'s wishlist'})
        } catch (error) {
            console.error('Error during adding game into user\'s wishlist:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteFromwishlist: async (req: Request, res: Response) => {
        const data = req.body;

        try {
            const wishlist = await prisma.wishlist.delete({
                where: { 
                    id: data.id
                }
            })

            return res.status(201).json({ message: 'Game successfully deleted from user\'s wishlist'})
        } catch (error) {
            console.error('Error during deleting game from user\'s wishlist:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
}

export default wishlistController;