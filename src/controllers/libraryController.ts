import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { da } from '@faker-js/faker/.';

const prisma = new PrismaClient();
dotenv.config();

const libraryController = {
    getLibrary: async (req: Request, res: Response) => {
        const user_id = parseInt(req.params.user_id)

        try {
            const library = await prisma.library.findMany({
                where: {
                    user_id: user_id 
                }
            });
            return res.status(200).json({
                library: library,
            });
        } catch (error) {
            console.error('Error during getting user\'s library:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    addToLibrary: async (req: Request, res: Response) => {
        const data = req.body;

        try {
            const library = await prisma.library.create({
                data
            })

            return res.status(201).json({ message: 'Game successfully added to user\'s library'})
        } catch (error) {
            console.error('Error during adding game into user\'s library:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteFromLibrary: async (req: Request, res: Response) => {
        const data = req.body;

        try {
            const library = await prisma.library.delete({
                where: { 
                    id: data.id
                }
            })

            return res.status(201).json({ message: 'Game successfully deleted from user\'s library'})
        } catch (error) {
            console.error('Error during deleting game from user\'s library:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateLibrary: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        const data = req.body;

        try {
            const library = await prisma.library.update({
                where: { 
                    id: id
                },
                data: {
                    platform_id: data.platform_id,
                }
            })

            return res.status(201).json({ message: 'User\'s library successfully updated'})
        } catch (error) {
            console.error('Error during updating user\'s library:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
}

export default libraryController;