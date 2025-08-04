/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `server` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `connIp` to the `server` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ip` to the `server` table without a default value. This is not possible if the table is not empty.
  - Added the required column `port` to the `server` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rconPassword` to the `server` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rconPort` to the `server` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sshPassword` to the `server` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sshUser` to the `server` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `server` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "server" ADD COLUMN     "connIp" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ip" TEXT NOT NULL,
ADD COLUMN     "port" INTEGER NOT NULL,
ADD COLUMN     "rconPassword" TEXT NOT NULL,
ADD COLUMN     "rconPort" INTEGER NOT NULL,
ADD COLUMN     "sshPassword" TEXT NOT NULL,
ADD COLUMN     "sshUser" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "server_name_key" ON "server"("name");
