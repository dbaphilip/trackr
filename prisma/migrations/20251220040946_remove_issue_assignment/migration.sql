/*
  Warnings:

  - You are about to drop the column `userId` on the `Issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_userId_fkey`;

-- DropIndex
DROP INDEX `Issue_userId_fkey` ON `Issue`;

-- AlterTable
ALTER TABLE `Issue` DROP COLUMN `userId`;
