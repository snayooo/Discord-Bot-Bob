/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `server` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "server_value_key" ON "server"("value");
