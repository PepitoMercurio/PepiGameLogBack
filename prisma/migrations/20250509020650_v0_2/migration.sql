/*
  Warnings:

  - Made the column `name` on table `games` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "games" ALTER COLUMN "name" SET NOT NULL;
