/*
  Warnings:

  - Made the column `discordAvatarUrl` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "lastDailyReward" TIMESTAMP(3),
ALTER COLUMN "discordAvatarUrl" SET NOT NULL;
