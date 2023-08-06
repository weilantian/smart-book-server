/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Bookable` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookableType" AS ENUM ('RECURRING', 'ONE_TIME');

-- AlterTable
ALTER TABLE "Bookable" ADD COLUMN     "type" "BookableType" NOT NULL;

-- DropTable
DROP TABLE "Event";

-- DropEnum
DROP TYPE "SlotStatus";
