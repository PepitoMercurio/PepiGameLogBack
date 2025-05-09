/*
  Warnings:

  - The `key_word` column on the `games` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "key_word",
ADD COLUMN     "key_word" TEXT[];
