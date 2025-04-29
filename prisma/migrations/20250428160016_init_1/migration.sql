/*
  Warnings:

  - You are about to drop the column `token` on the `Otp` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Otp_token_key";

-- AlterTable
ALTER TABLE "Otp" DROP COLUMN "token";
