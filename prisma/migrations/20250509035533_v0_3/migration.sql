/*
  Warnings:

  - Made the column `user_id` on table `library` required. This step will fail if there are existing NULL values in that column.
  - Made the column `game_id` on table `library` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "library" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "game_id" SET NOT NULL;
