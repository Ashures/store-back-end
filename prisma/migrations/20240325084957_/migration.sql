/*
  Warnings:

  - You are about to alter the column `experience` on the `UserStats` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "UserStats" ALTER COLUMN "experience" SET DATA TYPE INTEGER;
