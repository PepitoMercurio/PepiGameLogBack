import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { writeToString } from '@fast-csv/format';

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


    downloadLibraryAsCSV: async (req: Request, res: Response) => {
        const user_id = parseInt(req.params.user_id);

        try {
            const userLibrary = await prisma.library.findMany({
                where: {
                    user_id: user_id,
                },
                include: {
                    games: true,
                },
                take: 5,
            });

            if (userLibrary.length === 0) {
                return res.status(404).json({ message: 'No games found for this user' });
            }

            const games = userLibrary
                .map(entry => entry.games)
                .filter((game): game is NonNullable<typeof game> => game !== null);

            if (games.length === 0) {
                return res.status(404).json({ message: 'No valid game data found in library' });
            }

            const csv = await writeToString(games, { headers: true, delimiter: ';' });

            res.header('Content-Type', 'text/csv');
            res.attachment('library.csv');
            return res.send(csv);
        } catch (error) {
            console.error('Error during generating CSV for user\'s library:', error);
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