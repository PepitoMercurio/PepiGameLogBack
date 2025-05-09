import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

const prisma = new PrismaClient();
dotenv.config();

const gameController = {
    getGame: async (req: Request, res: Response) => {
        try {
            const games = await prisma.games.findMany();

            const formattedGames = games.map(game => ({
                ...game,
                id: parseInt(game.id.toString()),
                parent_game: game.parent_game ? parseInt(game.parent_game.toString()) : null,
            }));

            return res.status(200).json({
              games: formattedGames
            });
        } catch (error) {
            console.error('Error during getting the game list:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    getOneGame: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);

        try {
            const game = await prisma.games.findUnique({
                where: {
                    id: id,
                },
            });

            if (!game) {
                return res.status(404).json({ message: 'Game not found' });
            }

            const gameJson = {
                ...game,
                id: parseInt(game.id.toString()),
                parent_game: game.parent_game ? game.parent_game.toString() : null,
            };

            return res.status(200).json(gameJson);
        } catch (error) {
            console.error('Error during getting the game:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },


    addGame: async (req: Request, res: Response) => {
        const data = req.body;

        try {
            const game = await prisma.games.create({
                data
            })

            res.status(201).json({ message: 'Game created successfully' });
        } catch (error) {
            console.error('Error during adding a game:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateGame: async (req: Request, res: Response) => {
        const data = req.body;
        const id = parseInt(req.params.id, 10);

        try {
            const game = await prisma.games.update({
                where: {
                    id: id,
                },
                data,
            });

            const gameJson = {
                ...game,
                id: parseInt(game.id.toString()),
                parent_game: game.parent_game ? game.parent_game.toString() : null,
            };

            res.status(200).json({ message: 'Game updated successfully', game: gameJson });
        } catch (error) {
            console.error('Error during updating a game:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteGame: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);

        try {
            const game = await prisma.games.delete({
                where: {
                    id: id
                }
            })

            res.status(200).json({ message: 'Game deleted successfully' });
        } catch (error) {
            console.error('Error during updating a game:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    countGames: async (req: Request, res: Response) => {
        try {
            const count = await prisma.games.count();
            res.status(200).json({ count });
        } catch (error) {
            console.error('Error during counting games:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default gameController