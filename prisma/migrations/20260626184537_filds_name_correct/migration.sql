/*
  Warnings:

  - You are about to drop the column `id_usuario` on the `exercises` table. All the data in the column will be lost.
  - Added the required column `id_user` to the `exercises` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_id_usuario_fkey";

-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "id_usuario",
ADD COLUMN     "id_user" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
