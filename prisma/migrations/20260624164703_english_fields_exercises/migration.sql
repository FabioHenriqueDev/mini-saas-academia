/*
  Warnings:

  - You are about to drop the column `descricao` on the `exercises` table. All the data in the column will be lost.
  - You are about to drop the column `repeticoes` on the `exercises` table. All the data in the column will be lost.
  - Added the required column `description` to the `exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repetitions` to the `exercises` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "descricao",
DROP COLUMN "repeticoes",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "repetitions" INTEGER NOT NULL;
