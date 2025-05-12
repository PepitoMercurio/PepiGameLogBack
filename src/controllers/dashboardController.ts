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

            const leaderboard = await prisma.users.findMany({
                orderBy: {
                    rating: {
                    _count: 'desc',
                    },
                },
                take: 3,
            });

            const lastGames = await prisma.games.findMany({
                orderBy: {
                    id: 'desc',
                },
                take: 5
            })

            const aggregatedRatings = await prisma.rating.groupBy({
                by: ['game_id'],
                _avg: { rate: true },
                _count: { rate: true },
                orderBy: {
                    _avg: { rate: 'desc' },
                },
                take: 5,
            });

            const gameIds = aggregatedRatings.map(r => r.game_id);

            const games = await prisma.games.findMany({
                where: {
                    id: { in: gameIds },
                },
            });

            const topRatedGames = games.map(game => {
                const stats = aggregatedRatings.find(r => r.game_id === game.id);
                return {
                    ...game,
                    average_rating: stats?._avg.rate?.toNumber() ?? null,
                    ratings_count: stats?._count.rate ?? 0,
                };
            });


            const nextGames = await prisma.games.findMany({
                where: {
                    created_at: {
                    gt: new Date(),
                    },
                },
                orderBy: {
                    created_at: 'asc',
                },
                take: 5,
            });


            const formattedLeaderboard = leaderboard.map(user => ({
                ...user,
                id: parseInt(user.id.toString()),
            }))

            const formattedLastGames = lastGames.map(game => ({
                ...game,
                id: parseInt(game.id.toString()),
            }))

            const formattedTopRatedGames = topRatedGames.map(game => ({
                ...game,
                id: parseInt(game.id.toString()),
            }))

            const formattedNextames = nextGames.map(game => ({
                ...game,
                id: parseInt(game.id.toString()),
            }))

            const data = {
                stats: {
                    numberGames: countGames,
                    numberRating: countRates
                },
                leaderboard: formattedLeaderboard,
                lastGames: formattedLastGames,
                topRatedGames: formattedTopRatedGames,
                nextGames: formattedNextames
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

            const userLibrary = await prisma.library.findMany({
                where: {
                    user_id: user_id,
                },
                include: {
                    games: true,
                },
                take: 5,
            });

            const formattedUserGames = userLibrary
                .filter((entry) => entry.games !== null) // ignore les entrées sans jeu lié
                .map((entry) => ({
                    ...entry.games,
                    id: entry.games?.id ? Number(entry.games.id) : null,
                    library: [
                    {
                        id: Number(entry.id),
                        user_id: Number(entry.user_id),
                        game_id: Number(entry.game_id),
                        platform_id: entry.platform_id ? Number(entry.platform_id) : null,
                    },
                ],
            }));

            const userRatings = await prisma.rating.findMany({
            where: {
                user_id: user_id,
            },
            include: {
                games: true,
            },
            take: 5,
            });

            const formattedRatedGames = userRatings
                .filter((entry) => entry.games !== null)
                .map((entry) => ({
                    ...entry.games,
                    id: entry.games?.id ? Number(entry.games.id) : null,
                    rating: [
                    {
                        id: Number(entry.id),
                        user_id: Number(entry.user_id),
                        game_id: Number(entry.game_id),
                        rate: Number(entry.rate),
                        comment: entry.comment,
                    },
                ],
            }));

            const userWishlist = await prisma.wishlist.findMany({
                where: {
                    user_id: user_id,
                },
                include: {
                    games: true,
                },
                take: 5,
                });

            const formattedWishlistGames = userWishlist
                .filter((entry) => entry.games !== null)
                .map((entry) => ({
                    ...entry.games,
                    id: entry.games?.id ? Number(entry.games.id) : null,
                    wishlist: [
                    {
                        id: Number(entry.id),
                        user_id: Number(entry.user_id),
                        game_id: Number(entry.game_id),
                    },
                ],
            }));


            const data = {
                stats: {
                    numberLibrary: countLibrary,
                    numberRating: countRates,
                    numberWish: countWish,
                },
                userGames: formattedUserGames,
                userRatings: formattedRatedGames,
                userWishlist: formattedWishlistGames
            }

            res.status(200).json(data)
        } catch (error) {
            console.error('Error during getting dashboard:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
}

export default dashboardController;